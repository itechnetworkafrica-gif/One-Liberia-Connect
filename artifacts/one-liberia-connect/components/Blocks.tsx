import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Building2, Handshake, Radio, UsersRound, Globe2, ShieldCheck, Compass, HeartHandshake, GraduationCap, BriefcaseBusiness } from "lucide-react";
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
