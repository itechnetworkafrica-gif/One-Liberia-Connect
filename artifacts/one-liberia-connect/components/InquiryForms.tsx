"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const commonName = z.string().trim().min(2, "Please enter your name.");
const communitySchema = z.object({
 name: commonName, contactValue:z.string().trim().min(5,"Enter an email address or phone number."), preferredContactMethod:z.enum(["Email","Phone call","WhatsApp","SMS"]), communityAndCounty:z.string().trim().min(3,"Tell us the community and county."), connectionToArea:z.string().trim().min(2,"Please describe your connection to the area."), associationOrGroup:z.string().optional(), proposedSchool:z.string().optional(), connectivityNeeds:z.string().trim().min(8,"Please share a little about connectivity needs."), interests:z.array(z.string()).min(1,"Choose at least one interest."), permissionToRespond:z.literal(true,{errorMap:()=>({message:"Permission is required so we can respond."})}), generalCampaignUpdates:z.boolean(), website:z.string().max(0).optional(),
});
const partnershipSchema = z.object({
 name:commonName, organization:z.string().trim().min(2,"Enter your organization."), role:z.string().trim().min(2,"Enter your role."), email:z.string().email("Enter a valid email address."), country:z.string().trim().min(2,"Enter your country."), partnershipInterest:z.enum(["Investor","School","Delivery partner","Diaspora/organization","Other"]), relevantLocation:z.string().trim().min(2,"Enter a relevant location."), investmentFocus:z.string().trim().min(2,"Please share your focus."), meetingAvailability:z.string().trim().min(2,"Please share availability."), authorizedAdultContact:z.boolean(), siteInformation:z.string().trim().min(2,"Please share basic site information."), message:z.string().trim().min(8,"Please add a short message."), website:z.string().max(0).optional(),
});
const contactSchema = z.object({name:commonName,contactValue:z.string().trim().min(5,"Enter an email address or phone number."),inquiryType:z.enum(["Community Request","School Partnership","Investor Inquiry","General Inquiry"]),message:z.string().trim().min(8,"Please add a short message."),website:z.string().max(0).optional()});
type Community = z.infer<typeof communitySchema>;
type Partnership = z.infer<typeof partnershipSchema>;
type Contact = z.infer<typeof contactSchema>;
type Mode = "community"|"partnership"|"contact";
type SubmissionStatus = "success"|"preview"|"error"|null;

function Field({label,name,register,errors,wide=false,type="text",placeholder=""}:{label:string;name:string;register:any;errors:any;wide?:boolean;type?:string;placeholder?:string}) {
 const message=errors[name]?.message as string|undefined;
 return <label className={`field ${wide?"wide":""}`}>{label}<input type={type} placeholder={placeholder} {...register(name)} aria-invalid={!!message}/>{message&&<span className="error">{message}</span>}</label>;
}
function SelectField({label,name,register,errors,options}:{label:string;name:string;register:any;errors:any;options:string[]}) {const msg=errors[name]?.message as string|undefined;return <label className="field">{label}<select {...register(name)} aria-invalid={!!msg}>{options.map(o=><option key={o} value={o}>{o}</option>)}</select>{msg&&<span className="error">{msg}</span>}</label>}
function SubmissionState({status,onRetry}:{status:Exclude<SubmissionStatus,null>;onRetry:()=>void}) {
 if(status==="error") return <div className="form-error" role="alert"><strong>Your message could not be sent just now.</strong><p>Please check your connection and try again.</p><button className="btn btn-outline" type="button" onClick={onRetry}>Try again</button></div>;
 return <div className={`status-panel ${status==="preview"?"preview-status":""}`} role="status"><CheckCircle2 size={22}/><h3>{status==="preview"?"Preview completed":"Thank you for getting in touch."}</h3><p>{status==="preview"?"Email delivery is not configured, so this preview did not send or store your request. Add the email settings before relying on the live form.":"Your inquiry has been sent to One Liberia Connect. The information will help guide our conversations and planning."}</p></div>;
}

export function InquiryForm({mode}:{mode:Mode}) {
  const params=useSearchParams(); const [status,setStatus]=useState<SubmissionStatus>(null); const [busy,setBusy]=useState(false);
 const initialInterest=params.get("interest");
  if(mode==="community") return <CommunityForm status={status} setStatus={setStatus} busy={busy} setBusy={setBusy} initialInterest={initialInterest}/>;
 if(mode==="partnership") return <PartnershipForm status={status} setStatus={setStatus} busy={busy} setBusy={setBusy} initialInterest={initialInterest}/>;
 return <ContactForm status={status} setStatus={setStatus} busy={busy} setBusy={setBusy} initialType={params.get("type")}/>;
}
 function CommunityForm({status,setStatus,busy,setBusy,initialInterest}:any) {
  const interests=["Community Champion","School Hub Partnership","Community Updates","Partnership or Investor Conversation"];
  const selectedInterest=interests.includes(initialInterest)?[initialInterest]:[];
  const {register,handleSubmit,formState:{errors},reset}=useForm<Community>({resolver:zodResolver(communitySchema),defaultValues:{preferredContactMethod:"Email",interests:selectedInterest,permissionToRespond:false as never,generalCampaignUpdates:false,website:""}});
  const submit=async(data:Community)=>{setBusy(true);setStatus(null);try{const res=await fetch("/forms/inquiries",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({...data,type:"community"})});const result=await res.json() as {previewOnly?:boolean};if(!res.ok)throw new Error("submit");setStatus(result.previewOnly?"preview":"success");reset();}catch{setStatus("error")}finally{setBusy(false)}};
 if(status)return <SubmissionState status={status} onRetry={()=>setStatus(null)}/>;
 return <form onSubmit={handleSubmit(submit)} noValidate><div className="form-grid">
 <Field label="Name" name="name" register={register} errors={errors}/><Field label="Email or phone" name="contactValue" register={register} errors={errors}/>
 <SelectField label="Preferred contact method" name="preferredContactMethod" register={register} errors={errors} options={["Email","Phone call","WhatsApp","SMS"]}/><Field label="Community and county" name="communityAndCounty" register={register} errors={errors}/>
 <Field label="Connection to the area" name="connectionToArea" register={register} errors={errors}/><Field label="Association or group" name="associationOrGroup" register={register} errors={errors} placeholder="Optional"/>
 <Field label="Proposed school" name="proposedSchool" register={register} errors={errors} placeholder="Optional"/>
 <label className="field wide">Connectivity needs<textarea {...register("connectivityNeeds")} aria-invalid={!!errors.connectivityNeeds}/>{errors.connectivityNeeds&&<span className="error">{errors.connectivityNeeds.message}</span>}</label>
 <fieldset className="wide choice-field"><legend>Interest choices</legend><div className="choice-grid">{["Community Champion","School Hub Partnership","Community Updates","Partnership or Investor Conversation"].map(v=><label key={v}><input type="checkbox" value={v} {...register("interests")}/><span>{v}</span></label>)}</div>{errors.interests&&<span className="error">{errors.interests.message as string}</span>}</fieldset>
 <label className="check-row wide"><input type="checkbox" {...register("permissionToRespond")}/> <span>Permission to respond <b>(required)</b></span></label>{errors.permissionToRespond&&<span className="error wide">{errors.permissionToRespond.message as string}</span>}
 <label className="check-row wide"><input type="checkbox" {...register("generalCampaignUpdates")}/> <span>Optional general campaign updates</span></label>
 <details className="wide privacy-note"><summary>How we use this information</summary><p>We use your details to understand community interest and, with your permission, respond to your request. See our <a href="/privacy">privacy notice</a>.</p></details>
 <input className="honeypot" tabIndex={-1} autoComplete="off" aria-hidden="true" {...register("website")}/>
 </div><button className="btn btn-primary form-submit" disabled={busy}>{busy?"Sending…":"Submit community request"} <ArrowRight size={17}/></button></form>;
}
function PartnershipForm({status,setStatus,busy,setBusy,initialInterest}:any) {
 const defaultInterest=["Investor","School","Delivery partner","Diaspora/organization","Other"].includes(initialInterest)?initialInterest:"Investor";
 const {register,handleSubmit,formState:{errors},reset,setValue}=useForm<Partnership>({resolver:zodResolver(partnershipSchema),defaultValues:{partnershipInterest:defaultInterest,authorizedAdultContact:false,website:""}});
 useEffect(()=>{if(defaultInterest)setValue("partnershipInterest",defaultInterest)},[defaultInterest,setValue]);
  const submit=async(data:Partnership)=>{setBusy(true);setStatus(null);try{const res=await fetch("/forms/inquiries",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({...data,type:"partnership"})});const result=await res.json() as {previewOnly?:boolean};if(!res.ok)throw new Error("submit");setStatus(result.previewOnly?"preview":"success");reset();}catch{setStatus("error")}finally{setBusy(false)}};
 if(status)return <SubmissionState status={status} onRetry={()=>setStatus(null)}/>;
 return <form onSubmit={handleSubmit(submit)} noValidate><div className="form-grid">
 <Field label="Name" name="name" register={register} errors={errors}/><Field label="Organization" name="organization" register={register} errors={errors}/>
 <Field label="Role" name="role" register={register} errors={errors}/><Field label="Email" name="email" type="email" register={register} errors={errors}/>
 <Field label="Country" name="country" register={register} errors={errors}/><SelectField label="Partnership interest" name="partnershipInterest" register={register} errors={errors} options={["Investor","School","Delivery partner","Diaspora/organization","Other"]}/>
 <Field label="Relevant location" name="relevantLocation" register={register} errors={errors}/><Field label="Investment focus" name="investmentFocus" register={register} errors={errors}/>
 <Field label="Meeting availability" name="meetingAvailability" register={register} errors={errors}/>
 <label className="check-row"><input type="checkbox" {...register("authorizedAdultContact")}/> <span>I am an authorized adult contact</span></label>
 <label className="field wide">Basic site information<textarea {...register("siteInformation")} aria-invalid={!!errors.siteInformation}/>{errors.siteInformation&&<span className="error">{errors.siteInformation.message}</span>}</label>
 <label className="field wide">Message<textarea {...register("message")} aria-invalid={!!errors.message}/>{errors.message&&<span className="error">{errors.message.message}</span>}</label>
 <p className="helper wide">We use these details only to follow up on your inquiry.</p><input className="honeypot" tabIndex={-1} autoComplete="off" aria-hidden="true" {...register("website")}/>
 </div><button className="btn btn-primary form-submit" disabled={busy}>{busy?"Sending…":"Send partnership inquiry"} <ArrowRight size={17}/></button></form>;
}
function ContactForm({status,setStatus,busy,setBusy,initialType}:any) {
 const typeMap:Record<string,string>={community:"Community Request",school:"School Partnership",investor:"Investor Inquiry",general:"General Inquiry"};
 const defaultType=(typeMap[initialType]||"General Inquiry") as Contact["inquiryType"];
 const {register,handleSubmit,formState:{errors},reset,setValue}=useForm<Contact>({resolver:zodResolver(contactSchema),defaultValues:{inquiryType:defaultType,website:""}});
 useEffect(()=>{setValue("inquiryType",defaultType as Contact["inquiryType"])},[defaultType,setValue]);
  const submit=async(data:Contact)=>{setBusy(true);setStatus(null);try{const res=await fetch("/forms/inquiries",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({...data,type:"contact"})});const result=await res.json() as {previewOnly?:boolean};if(!res.ok)throw new Error("submit");setStatus(result.previewOnly?"preview":"success");reset();}catch{setStatus("error")}finally{setBusy(false)}};
 if(status)return <SubmissionState status={status} onRetry={()=>setStatus(null)}/>;
 return <form onSubmit={handleSubmit(submit)} noValidate><div className="form-grid">
 <Field label="Name" name="name" register={register} errors={errors}/><Field label="Email or phone" name="contactValue" register={register} errors={errors}/>
 <SelectField label="Inquiry type" name="inquiryType" register={register} errors={errors} options={["Community Request","School Partnership","Investor Inquiry","General Inquiry"]}/>
 <label className="field wide">Message<textarea {...register("message")} aria-invalid={!!errors.message}/>{errors.message&&<span className="error">{errors.message.message}</span>}</label>
 <input className="honeypot" tabIndex={-1} autoComplete="off" aria-hidden="true" {...register("website")}/>
 </div><button className="btn btn-primary form-submit" disabled={busy}>{busy?"Sending…":"Send message"} <ArrowRight size={17}/></button></form>;
}
