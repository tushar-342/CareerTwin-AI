import {NextRequest,NextResponse} from "next/server";
import {z} from "zod";
import {authenticated,safeError} from "@/lib/api";
import {adminDb} from "@/lib/firebase/admin";
import {getQuestion,publicQuestion} from "@/lib/learning/store";
const schema=z.object({quizId:z.string().regex(/^[a-zA-Z0-9_-]{1,128}$/)});
export async function POST(request:NextRequest){const auth=await authenticated(request);if("response" in auth)return auth.response;try{const parsed=schema.safeParse(await request.json());if(!parsed.success)return NextResponse.json({error:"Invalid quiz"},{status:400});const snap=await adminDb().doc(`users/${auth.user.uid}/quizAttempts/${parsed.data.quizId}`).get();if(!snap.exists)return NextResponse.json({error:"Quiz not found"},{status:404});const attempt=snap.data()!;if(attempt.status!=="in_progress")return NextResponse.json({completed:true},{status:200});const question=await getQuestion(attempt.currentQuestionId);if(!question)return NextResponse.json({error:"Question not found"},{status:404});return NextResponse.json({question:publicQuestion(question)});}catch(e){return safeError(e);}}
