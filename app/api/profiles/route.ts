import {getDb} from "@/db";
import {profiles} from "@/db/schema";
import {medicalFields} from "@/lib/medical-fields";
export async function POST(req:Request){
 if(req.headers.get("origin")&&req.headers.get("origin")!==new URL(req.url).origin)return Response.json({error:"Request origin not allowed."},{status:403});
 try{const body=await req.text();if(body.length>16000)return Response.json({error:"Profile is too large."},{status:413});const data=JSON.parse(body);const v=(key:string,max:number)=>typeof data[key]==="string"?data[key].trim().slice(0,max):"";
 const p={id:crypto.randomUUID(),name:v("name",80),campus:v("campus",100),blood:v("blood",10),allergies:v("allergies",300),conditions:v("conditions",300),contactName:v("contactName",80),phone:v("phone",20),createdAt:new Date().toISOString()};
 if(!p.name||!p.contactName||!/^[+0-9 ()-]{7,20}$/.test(p.phone)||!["Unknown","A+","A-","B+","B-","AB+","AB-","O+","O-"].includes(p.blood))return Response.json({error:"Please enter a name, valid blood group, and valid emergency contact."},{status:400});
 const medicalDetails=Object.fromEntries(medicalFields.map(f=>[f.key,typeof data.medicalDetails?.[f.key]==="string"?data.medicalDetails[f.key].trim().slice(0,600):""]));
 await getDb().insert(profiles).values({...p,medicalDetails:JSON.stringify(medicalDetails)});return Response.json(p,{status:201,headers:{"Cache-Control":"no-store"}});
 }catch{return Response.json({error:"Could not save your card. Please try again."},{status:500})}
}
