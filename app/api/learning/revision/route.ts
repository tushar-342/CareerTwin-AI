import { NextRequest,NextResponse } from "next/server";
import { authenticated,safeError } from "@/lib/api";
import { loadTwin } from "@/lib/learning/store";
import { concepts } from "@/lib/learning/catalog";
import { calculateRetention } from "@/lib/learning/forgetting";
import { revisionQueue } from "@/lib/learning/spaced-repetition";
export async function GET(request:NextRequest){const auth=await authenticated(request);if("response" in auth)return auth.response;try{const t=await loadTwin(auth.user.uid);const items=concepts.map(c=>({...t.conceptStates[c.id],skillId:c.skillId,importance:c.importance,retention:calculateRetention(t.conceptStates[c.id].mastery,t.conceptStates[c.id].lastPracticedAt)}));return NextResponse.json(revisionQueue(items));}catch(e){return safeError(e);}}
