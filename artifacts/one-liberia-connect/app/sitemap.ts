import type { MetadataRoute } from "next";
export default function sitemap():MetadataRoute.Sitemap {
 const base=process.env.NEXT_PUBLIC_SITE_URL??"https://1liberia.org";
 return ["","about","our-services","our-cause","partners-and-investors","connect-your-community","contact","privacy","terms"].map(path=>({url:`${base}/${path}`,lastModified:new Date(),changeFrequency:"monthly" as const,priority:path===""?1:.7}));
}
