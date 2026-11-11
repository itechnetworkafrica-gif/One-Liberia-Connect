import { Suspense } from "react";
import { PageHero, SectionLabel } from "@/components/Blocks";
import { InquiryForm } from "@/components/InquiryForms";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
export const metadata=pageMetadata("Contact","Contact One Liberia Connect about community requests, school partnerships, investor inquiries, or general questions.","/contact");
export default function Contact(){return <main id="main"><PageHero title="Contact"/><section className="section"><div className="container"><div className="contact-intro"><SectionLabel>Get in touch</SectionLabel><h2>Let’s discuss your community or partnership.</h2><p className="copy">Choose Community Request, School Partnership, Investor Inquiry, or General Inquiry so we can direct your message to the appropriate team.</p></div><div className="contact-layout"><div className="card form-card"><Suspense fallback={<div className="skeleton-form"/>}><InquiryForm mode="contact"/></Suspense></div><aside className="contact-aside"><h3>Contact details</h3><p className="copy">{site.contactNote}</p><div><Mail/><span><small>Email</small>{site.email}</span></div><div><Phone/><span><small>Phone</small>{site.phone}</span></div><div><MessageCircle/><span><small>WhatsApp</small>{site.whatsapp}</span></div><div><MapPin/><span><small>Location</small>{site.location}</span></div></aside></div></div></section></main>}
