import {eq} from "drizzle-orm";
import {getDb} from "@/db";
import {profiles} from "@/db/schema";
import {HeartPulse,Phone} from "lucide-react";
import Player from "./player";
import {medicalFields,parseMedicalDetails} from "@/lib/medical-fields";
export const dynamic="force-dynamic";
export const metadata={title:"Emergency profile | Scan2Save",robots:{index:false,follow:false}};
export default async function Profile({params}:{params:Promise<{id:string}>}){
 const {id}=await params;const p=await getDb().select().from(profiles).where(eq(profiles.id,id)).get();
 if(!p)return <main className="emergency"><a href="/" className="brand"><HeartPulse/>scan2save.</a><h2>Card not found.</h2><p>Check the QR code or ask the card owner for a new link.</p></main>;
 return <main className="emergency"><a href="/" className="brand"><HeartPulse/>scan2save.</a><p className="banner">If there is immediate danger, contact local emergency services first.</p><article className="profile-card"><div className="profile-top"><div className="eyebrow">EMERGENCY INFORMATION</div><h1>{p.name}</h1><p>{p.campus||"Student emergency card"}</p></div><div className="details">{[["Blood group · self-reported",p.blood],["Allergies · self-reported",p.allergies||"Not provided — do not assume none"],["Medical conditions · self-reported",p.conditions||"Not provided"]].map(([label,value])=><div className="detail" key={label}><span>{label}</span><strong>{value}</strong></div>)}{medicalFields.map(f=>{const value=parseMedicalDetails(p.medicalDetails)[f.key];return value?<div className="detail" key={f.key}><span>{f.label} · self-reported</span><strong>{value}</strong></div>:null})}</div></article><Player id={id}/><section className="contact-box"><div className="eyebrow">EMERGENCY CONTACT</div><h3>{p.contactName}</h3><a className="button full" href={`tel:${p.phone.replace(/[^+0-9]/g,"")}`}><Phone size={18}/>Call {p.phone}</a></section><p className="note">Information is entered by the card owner and has not been medically verified. Confirm important details with healthcare professionals. This page provides information, not diagnosis or treatment instructions.</p><p className="note">Created {new Date(p.createdAt).toLocaleDateString("en-IN",{day:"numeric",month:"short",year:"numeric",timeZone:"Asia/Kolkata"})}.</p></main>;
}

