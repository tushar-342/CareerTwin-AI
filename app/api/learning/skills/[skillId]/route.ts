import {NextRequest,NextResponse} from "next/server";
import {authenticated,safeError} from "@/lib/api";
import {getSkillsForUser} from "@/lib/learning/store";
export async function GET(request:NextRequest,{params}:{params:Promise<{skillId:string}>}){const auth=await authenticated(request);if("response" in auth)return auth.response;try{const {skillId}=await params;const skill=(await getSkillsForUser(auth.user.uid)).find(s=>s.id===skillId);return skill?NextResponse.json(skill):NextResponse.json({error:"Skill not found"},{status:404});}catch(e){return safeError(e);}}
