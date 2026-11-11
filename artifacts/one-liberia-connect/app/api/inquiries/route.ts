import { NextResponse } from "next/server";
import { z } from "zod";

export const runtime = "nodejs";

const optionalText = z
  .string()
  .trim()
  .max(3000)
  .optional()
  .transform((value) => (value ? value : undefined));
const requiredText = (max = 3000) => z.string().trim().min(1).max(max);
const honeypot = z.string().max(200).optional().default("");

const communityInquiry = z.object({
  type: z.literal("community"),
  name: requiredText(120),
  contactValue: requiredText(200),
  preferredContactMethod: z.enum(["Email", "Phone call", "WhatsApp", "SMS"]),
  communityAndCounty: requiredText(240),
  connectionToArea: requiredText(500),
  associationOrGroup: optionalText,
  proposedSchool: optionalText,
  connectivityNeeds: requiredText(3000),
  interests: z
    .array(
      z.enum([
        "Community Champion",
        "School Hub Partnership",
        "Community Updates",
        "Partnership or Investor Conversation",
      ]),
    )
    .min(1)
    .max(4),
  permissionToRespond: z.literal(true),
  generalCampaignUpdates: z.boolean(),
  website: honeypot,
});

const partnershipInquiry = z.object({
  type: z.literal("partnership"),
  name: requiredText(120),
  organization: optionalText,
  role: optionalText,
  email: z.string().trim().email().max(254),
  country: optionalText,
  partnershipInterest: z.enum([
    "Investor",
    "School",
    "Delivery partner",
    "Diaspora/organization",
    "Other",
  ]),
  relevantLocation: optionalText,
  investmentFocus: optionalText,
  meetingAvailability: optionalText,
  authorizedAdultContact: z.boolean(),
  siteInformation: optionalText,
  message: requiredText(5000),
  website: honeypot,
});

const contactInquiry = z.object({
  type: z.literal("contact"),
  name: requiredText(120),
  contactValue: requiredText(200),
  inquiryType: z.enum([
    "Community Request",
    "School Partnership",
    "Investor Inquiry",
    "General Inquiry",
  ]),
  message: requiredText(3000),
  website: honeypot,
});

const inquirySchema = z.discriminatedUnion("type", [
  communityInquiry,
  partnershipInquiry,
  contactInquiry,
]);

type Inquiry = z.infer<typeof inquirySchema>;

const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const requestWindows = new Map<string, { count: number; resetAt: number }>();

function getClientKey(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const address =
    request.headers.get("x-real-ip") ??
    forwardedFor?.split(",")[0]?.trim() ??
    "unknown";
  return address.slice(0, 120);
}

function isRateLimited(key: string, now = Date.now()) {
  if (requestWindows.size > 10_000) {
    for (const [clientKey, window] of requestWindows) {
      if (window.resetAt <= now) requestWindows.delete(clientKey);
    }
  }

  const current = requestWindows.get(key);
  if (!current || current.resetAt <= now) {
    requestWindows.set(key, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });
    return { limited: false, resetAt: now + RATE_LIMIT_WINDOW_MS };
  }

  if (current.count >= RATE_LIMIT_MAX_REQUESTS) {
    return { limited: true, resetAt: current.resetAt };
  }

  current.count += 1;
  return { limited: false, resetAt: current.resetAt };
}

function getSubject(inquiry: Inquiry) {
  switch (inquiry.type) {
    case "community":
      return `Community request: ${inquiry.communityAndCounty}`;
    case "partnership":
      return `Partnership inquiry: ${inquiry.partnershipInterest}`;
    case "contact":
      return `Website inquiry: ${inquiry.inquiryType}`;
  }
}

function getEmailText(inquiry: Inquiry) {
  const { website: _website, ...details } = inquiry;
  return Object.entries(details)
    .map(([key, value]) => {
      const formatted = Array.isArray(value) ? value.join(", ") : String(value);
      return `${key}\n${formatted}`;
    })
    .join("\n\n");
}

export async function POST(request: Request) {
  const rate = isRateLimited(getClientKey(request));
  if (rate.limited) {
    return NextResponse.json(
      { error: "Too many requests. Please wait before trying again." },
      {
        status: 429,
        headers: {
          "Retry-After": String(
            Math.max(1, Math.ceil((rate.resetAt - Date.now()) / 1000)),
          ),
        },
      },
    );
  }

  const contentLength = Number(request.headers.get("content-length") ?? "0");
  if (Number.isFinite(contentLength) && contentLength > 25_000) {
    return NextResponse.json(
      { error: "This request is too large. Please shorten your message." },
      { status: 413 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Please submit the form again." },
      { status: 400 },
    );
  }

  const parsed = inquirySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please review the form fields and try again." },
      { status: 400 },
    );
  }

  const inquiry = parsed.data;
  if (inquiry.website) {
    return NextResponse.json({ success: true });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const recipient = process.env.CONTACT_TO_EMAIL;
  const sender = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !recipient || !sender) {
    console.info(
      "Email delivery is not configured. The form preview completed without sending an email.",
    );
    return NextResponse.json({ success: true, previewOnly: true });
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: sender,
        to: [recipient],
        subject: getSubject(inquiry),
        text: getEmailText(inquiry),
      }),
    });

    if (!response.ok) {
      console.error("Resend could not deliver a website inquiry.", {
        status: response.status,
      });
      return NextResponse.json(
        { error: "We couldn't send your message just now. Please try again." },
        { status: 502 },
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    console.error("The email service could not be reached for a website inquiry.");
    return NextResponse.json(
      { error: "We couldn't send your message just now. Please try again." },
      { status: 502 },
    );
  }
}
