import {env} from "cloudflare:workers";
import {eq} from "drizzle-orm";
import {getDb} from "@/db";
import {profiles} from "@/db/schema";
import {validLanguage} from "./languages";
import {medicalFields,parseMedicalDetails} from "./medical-fields";
export async function medicalTranslation(id:string,source:string,target:string){
 if(!validLanguage(source)||!validLanguage(target))throw new Error("INVALID_LANGUAGE");
 const p=await getDb().select().from(profiles).where(eq(profiles.id,id)).get();
 if(!p)throw new Error("NOT_FOUND");
 const key=(env as unknown as {SARVAM_API_KEY?:string}).SARVAM_API_KEY;
 if(!key)throw new Error("NOT_CONFIGURED");
 const translate=async(input:string,from:string)=>{
  if(from===target)return input;
  const r=await fetch("https://api.sarvam.ai/translate",{method:"POST",headers:{"Content-Type":"application/json","api-subscription-key":key},body:JSON.stringify({input,source_language_code:from,target_language_code:target,model:"sarvam-translate:v1",mode:"formal",numerals_format:"international"}),signal:AbortSignal.timeout(30000)});
  if(!r.ok)throw new Error(`SARVAM_${r.status}`);
  const data=await r.json() as {translated_text?:string};if(!data.translated_text)throw new Error("EMPTY_TRANSLATION");return data.translated_text;
 };
 // Labels have a known English source; user-entered fields use the selected source.
 const [labels,allergies,conditions]=await Promise.all([
  translate("Self-reported information, not medically verified. Machine translation: check the original. This is not medical advice. A blank field means information was not provided.","en-IN"),
  p.allergies?translate(p.allergies,source):Promise.resolve(""),
  p.conditions?translate(p.conditions,source):Promise.resolve(""),
 ]);
 const details=parseMedicalDetails(p.medicalDetails);
 const extras=await Promise.all(medicalFields.filter(f=>details[f.key]).map(async f=>({key:f.key,label:await translate(f.label,"en-IN"),text:await translate(details[f.key]!,source)})));
 return {labels,allergies,conditions,extras,source,target};
}
export function translationError(e:unknown){
 const code=e instanceof Error?e.message:"";
 const status=code==="NOT_FOUND"?404:code==="INVALID_LANGUAGE"?400:code==="NOT_CONFIGURED"?503:502;
 return Response.json({error:code==="NOT_FOUND"?"Profile not found.":code==="INVALID_LANGUAGE"?"Choose a supported language.":code==="NOT_CONFIGURED"?"Translation is not configured yet.":code==="SARVAM_429"?"Sarvam is busy. Please try again shortly.":"Sarvam could not process this request. Original details remain available."},{status,headers:{"Cache-Control":"no-store"}});
}
