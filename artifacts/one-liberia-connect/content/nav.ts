import type { NavItem } from "./site";
export const navigation: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about", children: [
    { label: "Our Vision", href: "/about#vision" }, { label: "Our Mission", href: "/about#mission" }, { label: "Our Approach", href: "/about#approach" },
  ] },
  { label: "Our Services", href: "/our-services", children: [
    { label: "Community Broadband", href: "/our-services#community-broadband" }, { label: "Technology Hubs", href: "/our-services#technology-hubs" }, { label: "Connectivity Partnerships", href: "/our-services#partnerships" },
  ] },
  { label: "Our Cause", href: "/our-cause" },
  { label: "Partners and Investors", href: "/partners-and-investors", children: [
    { label: "For Investors", href: "/partners-and-investors#investors" }, { label: "For Schools and Partners", href: "/partners-and-investors#schools" }, { label: "Progress Updates", href: "/partners-and-investors#progress" }, { label: "Partnership Inquiry", href: "/partners-and-investors#partnership-form" },
  ] },
  { label: "Contact", href: "/contact" },
  { label: "Connect Your Community", href: "/connect-your-community", children: [
    { label: "Request Your Community", href: "/connect-your-community#request-form" },
    { label: "Become a Community Champion", href: "/connect-your-community?interest=Community%20Champion#request-form" },
    { label: "Propose a Partner School", href: "/connect-your-community?interest=School%20Hub%20Partnership#request-form" },
    { label: "FAQ", href: "/connect-your-community#faq" },
  ] },
];
