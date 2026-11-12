"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowUp, ArrowUpRight, Facebook, Linkedin, Menu, MessageCircle, X, ChevronDown } from "lucide-react";
import { navigation } from "@/content/nav";
import { site } from "@/content/site";

export function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    let frame = 0;
    const update = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setScrolled(window.scrollY > 16);
        setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  const isCurrent = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  return <>
    <div className="scroll-progress" style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
    <div id="top" className={`container header-row ${scrolled ? "is-scrolled" : ""}`}>
      <Link href="/" aria-label="One Liberia Connect home" className="brand"><Image src="/images/logo.png" alt="One Liberia Connect" width={260} height={72} priority /></Link>
      <nav className="desktop-nav" aria-label="Main navigation">
        {navigation.map(item => <div className={`nav-wrap ${item.label === "Connect Your Community" ? "header-cta-wrap" : ""}`} key={item.href}>
          <Link className={`${item.label === "Connect Your Community" ? "btn btn-primary header-cta" : "nav-link"} ${isCurrent(item.href) ? "is-active" : ""}`} href={item.href} aria-current={isCurrent(item.href) ? "page" : undefined}>{item.label}{item.children && <ChevronDown size={13} />}</Link>
          {item.children && <div className="nav-popover">{item.children.map(child => <Link href={child.href} key={child.href}>{child.label}<ArrowUpRight size={14}/></Link>)}</div>}
        </div>)}
      </nav>
      <button className="menu-toggle" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</button>
    </div>
    {open && <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation">
      {navigation.map(item => <div key={item.href} className="mobile-nav-item">
        <div className="mobile-main-link"><Link className={isCurrent(item.href) ? "is-active" : ""} href={item.href} onClick={() => setOpen(false)} aria-current={isCurrent(item.href) ? "page" : undefined}>{item.label}</Link>{item.children && <button aria-label={`Show ${item.label} links`} aria-expanded={active === item.label} onClick={() => setActive(active === item.label ? null : item.label)}><ChevronDown size={18}/></button>}</div>
        {item.children && active === item.label && <div className="mobile-sub">{item.children.map(child => <Link key={child.href} href={child.href} onClick={() => setOpen(false)}>{child.label}</Link>)}</div>}
      </div>)}
      <Link className="btn btn-primary" href="/connect-your-community" onClick={() => setOpen(false)}>Connect your community <ArrowUpRight size={16}/></Link>
    </nav>}
    </header>
    {scrolled && <a className="back-to-top" href="#top" aria-label="Back to top"><ArrowUp size={19}/></a>}
  </>;
}

export function Footer() {
  const pathname = usePathname();
  const exploreLinks = [["About Us","/about"],["Our Services","/our-services"],["Our Cause","/our-cause"]];
  const participateLinks = [["Connect Your Community","/connect-your-community"],["Partners and Investors","/partners-and-investors"],["Contact","/contact"]];
  const footerContactLines = [
    site.email,
    site.phone && site.phone !== site.email ? `Phone: ${site.phone}` : undefined,
    site.whatsapp && site.whatsapp !== site.email && site.whatsapp !== site.phone ? `WhatsApp: ${site.whatsapp}` : undefined,
  ].filter((line): line is string => Boolean(line));
  const socialMark = (label: string) => {
    if (label === "LinkedIn") return <Linkedin size={16}/>;
    if (label === "Facebook") return <Facebook size={16}/>;
    if (label === "WhatsApp") return <MessageCircle size={16}/>;
    return <span className="social-x" aria-hidden="true">X</span>;
  };
  return <footer className="footer" id="site-footer">
    <div className="container footer-main">
      <div className="footer-brand"><div className="logo-card"><Image src="/images/logo.png" alt="One Liberia Connect" width={250} height={70} loading="eager"/></div><p>{site.parent}</p><strong>{site.tagline}</strong><p className="footer-note">Expanding access to learning and economic opportunity across Liberia.</p></div>
       <div><h3>Explore</h3><div className="footer-links">{exploreLinks.map(([label,href])=><Link className={pathname===href?"footer-active":""} href={href} key={href} aria-current={pathname===href?"page":undefined}>{label}</Link>)}</div></div>
       <div><h3>Get involved</h3><div className="footer-links">{participateLinks.map(([label,href])=><Link className={pathname===href?"footer-active":""} href={href} key={href} aria-current={pathname===href?"page":undefined}>{label}</Link>)}</div></div>
       <div><h3>Get in touch</h3>{footerContactLines.map((line) => <p className="footer-note" key={line}>{line}</p>)}<p className="footer-note">{site.location}</p><Link className="footer-email" href="/contact">Send us a message <ArrowUpRight size={15}/></Link></div>
    </div>
    <div className="container footer-bottom">
      <span className="footer-copyright">© {new Date().getFullYear()} One Liberia Enterprise Corporation</span>
      <div className="footer-legal-links"><Link href="/privacy">Privacy Policy</Link><Link href="/terms">Terms</Link><Link href="/sitemap.xml">Sitemap</Link><a href="#top">Back to top ↑</a></div>
      <div className="footer-socials" aria-label="Social media links">{site.socials.map((social) => social.href ? <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label}>{socialMark(social.label)}</a> : <span key={social.label} className="social-placeholder" title={`${social.label} link to be added`} role="img" aria-label={`${social.label} link to be added`}>{socialMark(social.label)}</span>)}</div>
    </div>
  </footer>;
}
