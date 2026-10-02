import { NextRequest,NextResponse } from "next/server";
import { authenticated,safeError } from "@/lib/api";
import { loadTwin } from "@/lib/learning/store";
import { calculateRetention } from "@/lib/learning/forgetting";
import { z } from "zod";
const profileSchema=z.object({careerGoal:z.string().trim().max(120),targetRoles:z.array(z.string().min(1).max(80)).max(8),availableLearningTime:z.number().int().min(5).max(240)});
export async function GET(request:NextRequest){const auth=await authenticated(request);if("response" in auth)return auth.response;try{const twin=await loadTwin(auth.user.uid);for(const s of Object.values(twin.skillStates))s.retention=s.conceptIds.length?s.conceptIds.reduce((sum,c)=>sum+calculateRetention(twin.conceptStates[c]?.mastery??0,twin.conceptStates[c]?.lastPracticedAt),0)/s.conceptIds.length:0;return NextResponse.json(twin);}catch(e){return safeError(e);}}
export async function PATCH(request:NextRequest){const auth=await authenticated(request);if("response" in auth)return auth.response;try{const parsed=profileSchema.safeParse(await request.json());if(!parsed.success)return NextResponse.json({error:"Invalid career profile"},{status:400});const {careerGoal,targetRoles,availableLearningTime}=parsed.data;const {adminDb}=await import("@/lib/firebase/admin");await adminDb().doc(`users/${auth.user.uid}/digitalTwin/profile`).set({careerGoal,targetRoles,availableLearningTime,updatedAt:Date.now()},{merge:true});return NextResponse.json({ok:true});}catch(e){return safeError(e);}}
