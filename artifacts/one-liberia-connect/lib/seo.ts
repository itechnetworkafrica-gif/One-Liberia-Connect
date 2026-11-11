import type { Metadata } from "next";
const origin=process.env.NEXT_PUBLIC_SITE_URL??"https://1liberia.org";
export function pageMetadata(title:string,description:string,path:string):Metadata {
 const url=`${origin}${path}`;
 return {title,description,alternates:{canonical:path},openGraph:{type:"website",siteName:"One Liberia Connect",title:`${title} | One Liberia Connect`,description,url,images:[{url:"/images/mission.jpg",width:812,height:1024}]},twitter:{card:"summary_large_image",title:`${title} | One Liberia Connect`,description,images:["/images/mission.jpg"]}};
}
