export type NavItem = { label: string; href: string; children?: { label: string; href: string }[] };
export const site = {
  name: "One Liberia Connect",
  tagline: "In the Community, Built by the Diaspora.",
  parent: "A division of One Liberia Enterprise Corporation",
  email: "Contact details are being finalized",
  phone: "Contact details are being finalized",
  whatsapp: "Contact details are being finalized",
  location: "Monrovia, Liberia",
  contactNote: "Contact details are placeholders and can be edited in content/site.ts.",
  socials: [
    { label: "LinkedIn", href: "" },
    { label: "Facebook", href: "" },
    { label: "X", href: "" },
    { label: "WhatsApp", href: "" },
  ],
};
export const services = [
  { title: "Community broadband", text: "We develop internet access for communities where better connectivity can support daily life, learning, and local enterprise. Our expansion approach starts with community requests, local engagement, and a review of what is needed to establish and sustain service.", href: "/connect-your-community", icon: "signal" },
  { title: "Technology hubs in partner schools", text: "We are planning technology hubs in partner schools to bring internet access and practical digital learning closer to the communities we serve.", href: "/our-services#technology-hubs", icon: "school" },
  { title: "Connectivity partnerships", text: "We welcome schools, community organizations, and local businesses interested in working with us to improve internet access in line with local needs.", href: "/contact?type=general", icon: "handshake" },
];
export const steps = [
  { title: "Tell us about your community", text: "Share your community and county, your connection to the area, and the needs you would like us to understand. You can also suggest a school or introduce a local contact." },
  { title: "Bring your community into the conversation", text: "Invite your hometown association, school leaders, church, or alumni group to participate. Community champions help explain the local need and identify possible partners." },
  { title: "We review demand and feasibility", text: "We consider community interest alongside coverage needs, suitable sites, power, local partnerships, and the resources required to establish sustainable service. This information helps guide a review of whether a community coverage project or installation could proceed." },
];
