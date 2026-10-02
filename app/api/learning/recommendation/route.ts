import { NextRequest,NextResponse } from "next/server";
import { authenticated,safeError } from "@/lib/api";
import { getUserEvents,loadTwin } from "@/lib/learning/store";
import { recommendNextAction } from "@/lib/learning/next-best-action";
export async function GET(request:NextRequest){const auth=await authenticated(request);if("response" in auth)return auth.response;try{const [twin,events]=await Promise.all([loadTwin(auth.user.uid),getUserEvents(auth.user.uid,5)]);return NextResponse.json(recommendNextAction(twin,events));}catch(e){return safeError(e);}}
