import {env} from "cloudflare:workers";
import {spokenLanguages} from "@/lib/languages";
import {translationError} from "@/lib/medical-translation";
export async function POST(req:Request){
 if(req.headers.get("origin")&&req.headers.get("origin")!==new URL(req.url).origin)return Response.json({error:"Request origin not allowed."},{status:403});
 const key=(env as unknown as {SARVAM_API_KEY?:string}).SARVAM_API_KEY;
 if(!key)return Response.json({error:"Audio is awaiting Sarvam key setup."},{status:503});
 const target=new URL(req.url).searchParams.get("target")||"hi-IN";
 if(!spokenLanguages.has(target))return Response.json({error:"Audio is not available for this language."},{status:400});
 try{const raw=await req.text();if(raw.length>10000)return Response.json({error:"Text is too long."},{status:413});const data=JSON.parse(raw) as {text?:unknown};if(typeof data.text!=="string"||!data.text.trim()||data.text.length>2500)return Response.json({error:"Provide text under 2500 characters."},{status:400});
 const r=await fetch("https://api.sarvam.ai/text-to-speech",{method:"POST",headers:{"Content-Type":"application/json","api-subscription-key":key},body:JSON.stringify({text:data.text,language_code:target,model:"bulbul:v3",speaker:"shubh",output_audio_codec:"wav"}),signal:AbortSignal.timeout(45000)});
 if(!r.ok)throw Error(`SARVAM_${r.status}`);const body=await r.json() as {audios?:string[]};if(!body.audios?.[0])throw Error("EMPTY_AUDIO");const bytes=Uint8Array.from(atob(body.audios[0]),c=>c.charCodeAt(0));return new Response(bytes,{headers:{"Content-Type":"audio/wav","Cache-Control":"private, no-store"}});
 }catch(e){return translationError(e)}
}
