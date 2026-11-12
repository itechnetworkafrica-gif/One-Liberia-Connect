import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Building2, Handshake, Radio, UsersRound, Globe2, ShieldCheck, Compass, HeartHandshake, GraduationCap, BriefcaseBusiness, BookOpen, MapPin, MessagesSquare } from "lucide-react";
import { services, steps } from "@/content/site";
import { Reveal } from "@/components/Reveal";

export const imageBlurData = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3Crect width='1' height='1' fill='%23eaf2fc'/%3E%3C/svg%3E";

export function PageHero({ title, crumb = title, intro }: { title:string; crumb?:string; intro?:string }) {
  return <section className="page-hero"><div className="container"><div className="crumb"><Link href="/">Home</Link><span>/</span><span>{crumb}</span></div><h1>{title}</h1>{intro&&<p className="hero-intro">{intro}</p>}</div></section>;
}
export function SectionLabel({children}:{children:string}) { return <div className="eyebrow">{children}</div>; }
export function Photo({src,alt,priority=false}:{src:string;alt:string;priority?:boolean}) { return <div className="image-frame"><Image src={src} alt={alt} fill sizes="(max-width: 760px) 100vw, 50vw" priority={priority} placeholder="blur" blurDataURL={imageBlurData} /></div>; }
export function CTA({title="Ready to start a conversation?",text="Tell us about your community, school, or organization.",dark=false}:{title?:string;text?:string;dark?:boolean}) {
 return <section className={`cta-band ${dark?"cta-dark":""}`}><div className="container cta-inner"><div><span className="eyebrow">Take the next step</span><h2>{title}</h2><p>{text}</p></div><div className="cta-actions"><Link className="btn btn-primary" href="/connect-your-community">Connect your community <ArrowRight size={17}/></Link><Link className="btn btn-light" href="/partners-and-investors">Partner with us <ArrowUpRight size={16}/></Link></div></div></section>;
}
const serviceIcons = [Radio, GraduationCap, Handshake];
export function ServiceCards({includeTechnologyHubs=true}:{includeTechnologyHubs?:boolean}) { const items=services.map((service,index)=>({service,Icon:serviceIcons[index]})).filter(({service})=>includeTechnologyHubs||service.icon!=="school"); return <div className={items.length===2?"grid-two":"grid-three"}>{items.map(({service,Icon},i)=><Reveal key={service.title} delay={i*.08}><article className="card service-card"><div className="icon-tile"><Icon size={23}/></div><h3>{service.title}</h3><p>{service.text}</p><Link href={service.href}>Explore <ArrowRight size={16}/></Link></article></Reveal>)}</div>; }
export function Steps() { return <div className="grid-three">{steps.map((step,i)=><Reveal key={step.title} delay={i*.08}><article className="step-card"><span className="step-number">0{i+1}</span><h3>{step.title}</h3><p>{step.text}</p></article></Reveal>)}</div>; }
export function AudienceCards() {
  const cards=[{title:"For investors",text:"Discuss our business model, operations, expansion priorities, and growth requirements directly with One Liberia Enterprise Corporation.",href:"/partners-and-investors?interest=Investor#partnership-form",icon:BriefcaseBusiness,interest:"Investor"},{title:"For schools",text:"Explore hosting a planned technology hub and share what your school and learners need.",href:"/partners-and-investors?interest=School#partnership-form",icon:Building2,interest:"School"},{title:"For diaspora and organizations",text:"Help identify communities, support local leaders, and organize local participation.",href:"/connect-your-community?interest=Community%20Champion#request-form",icon:Globe2,interest:"Diaspora/organization"}];
 return <div className="grid-three">{cards.map((c,i)=><article className={`audience-card accent-${i}`} key={c.title}><c.icon size={24}/><h3>{c.title}</h3><p>{c.text}</p><Link href={c.href}>Start a conversation <ArrowRight size={16}/></Link></article>)}</div>;
}
export function Principles() { const data=[["Community-led","Local knowledge should shape the conversation.",UsersRound],["Practical","We consider what each location needs to make connectivity useful.",Compass],["Transparent","We aim to distinguish plans from completed work.",ShieldCheck],["Sustainable","We look at the resources and partnerships needed over time.",HeartHandshake]] as const; return <div className="principle-grid">{data.map(([title,text,Icon])=><div className="principle" key={title}><Icon/><h3>{title}</h3><p>{text}</p></div>)}</div>; }
export function FAQList({items}:{items:{q:string;a:string}[]}) { return <div className="faq-list">{items.map(f=><details className="faq-item" key={f.q}><summary>{f.q}<span>+</span></summary><p>{f.a}</p></details>)}</div>; }
export function ImageFeature({src,alt,eyebrow,title,children,reverse=false,id}:{src:string;alt:string;eyebrow:string;title:string;children:React.ReactNode;reverse?:boolean;id?:string}) { return <section id={id} className="section"><div className={`container grid-two ${reverse?"reverse":""}`}><Photo src={src} alt={alt}/><div><SectionLabel>{eyebrow}</SectionLabel><h2>{title}</h2><div className="copy">{children}</div></div></div></section>; }

export function BenefitCards() {
  const items = [
    { Icon: MapPin, title: "Start with local needs", text: "Community requests and local knowledge help shape where we look next." },
    { Icon: BookOpen, title: "Keep learning in view", text: "We are planning technology hubs in partner schools to bring internet access and practical digital learning closer." },
    { Icon: MessagesSquare, title: "Make room for partners", text: "Schools, community organizations, local businesses, and diaspora groups can take part in the conversation." },
    { Icon: ShieldCheck, title: "Review before a decision", text: "A feasibility review considers whether and how a project could proceed." },
  ];
  return <div className="benefit-grid">{items.map(({ Icon, title, text }, index) => <Reveal key={title} delay={index * .06}><article className="benefit-card"><div className="benefit-icon"><Icon size={22}/></div><h3>{title}</h3><p>{text}</p></article></Reveal>)}</div>;
}

export function PhotoStories() {
  const stories = [
    { src: "/images/approach-meeting.jpg", alt: "Community members sharing local perspectives during a meeting", tag: "COMMUNITY", title: "Local knowledge shapes the conversation", text: "Community champions help explain local needs and identify possible partners.", href: "/connect-your-community" },
    { src: "/images/vision.jpg", alt: "Two people learning together with a laptop", tag: "LEARNING", title: "Planning technology hubs in partner schools", text: "Explore what hosting a planned technology hub could mean for your school.", href: "/our-services#technology-hubs" },
    { src: "/images/about-technician.jpg", alt: "A telecommunications tower against a blue sky", tag: "CONNECTIVITY", title: "Practical review, before next steps", text: "Coverage, sites, power, local partnerships, and resources inform feasibility.", href: "/our-services#community-broadband" },
  ];
  return <div className="story-grid">{stories.map((story, index) => <Reveal key={story.title} delay={index * .08}><article className="story-card"><Link href={story.href} className="story-image"><Image src={story.src} alt={story.alt} fill sizes="(max-width:760px) 100vw, 34vw" placeholder="blur" blurDataURL={imageBlurData}/><span className="story-tag">{story.tag}</span></Link><div className="story-copy"><h3>{story.title}</h3><p>{story.text}</p><Link href={story.href}>Explore <ArrowRight size={15}/></Link></div></article></Reveal>)}</div>;
}

export function EditorialCards() {
  const items = [
    { n: "01", Icon: UsersRound, title: "Community champions", text: "Help identify communities, support local leaders, and organize local participation.", href: "/connect-your-community?interest=Community%20Champion#request-form", link: "Bring people into the conversation" },
    { n: "02", Icon: GraduationCap, title: "Schools", text: "Explore hosting a planned technology hub and share what your school and learners need.", href: "/partners-and-investors?interest=School#partnership-form", link: "Explore school partnership" },
    { n: "03", Icon: Handshake, title: "Partners and investors", text: "Discuss our business model, operations, expansion priorities, and growth requirements directly with One Liberia Enterprise Corporation.", href: "/partners-and-investors", link: "Learn about partnership" },
  ];
  return <div className="editorial-grid">{items.map(({ n, Icon, title, text, href, link }) => <Reveal key={n}><article className="editorial-card"><span className="editorial-number">{n}</span><div className="editorial-icon"><Icon size={22}/></div><h3>{title}</h3><p>{text}</p><Link href={href}>{link}<ArrowUpRight size={16}/></Link></article></Reveal>)}</div>;
}
