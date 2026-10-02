import { NextRequest,NextResponse } from "next/server";
import { authenticated,safeError } from "@/lib/api";
import { loadTwin } from "@/lib/learning/store";
export async function GET(request:NextRequest){const auth=await authenticated(request);if("response" in auth)return auth.response;try{const twin=await loadTwin(auth.user.uid);return NextResponse.json({skills:twin.skillStates,concepts:twin.conceptStates});}catch(e){return safeError(e);}}
