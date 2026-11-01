import {medicalTranslation,translationError} from "@/lib/medical-translation";
export async function POST(req:Request,{params}:{params:Promise<{id:string}>}){
 if(req.headers.get("origin")&&req.headers.get("origin")!==new URL(req.url).origin)return Response.json({error:"Request origin not allowed."},{status:403});
 try{const {id}=await params;const u=new URL(req.url);return Response.json(await medicalTranslation(id,u.searchParams.get("source")||"en-IN",u.searchParams.get("target")||"hi-IN"),{headers:{"Cache-Control":"no-store"}})}catch(e){return translationError(e)}
}
