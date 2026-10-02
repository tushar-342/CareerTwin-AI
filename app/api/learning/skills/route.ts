import { NextRequest,NextResponse } from "next/server";
import { authenticated,safeError } from "@/lib/api";
import { getSkillsForUser } from "@/lib/learning/store";
export async function GET(request:NextRequest){const auth=await authenticated(request);if("response" in auth)return auth.response;try{return NextResponse.json(await getSkillsForUser(auth.user.uid));}catch(e){return safeError(e);}}
