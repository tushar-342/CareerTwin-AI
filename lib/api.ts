import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { requireUser } from "@/lib/auth/server";
export async function authenticated(request:NextRequest){try{const user=await requireUser(request);if(!user)return {response:NextResponse.json({error:"Authentication required"},{status:401})};return {user};}catch(error){return {response:safeError(error)};}}
export function safeError(error:unknown){const missingConfig=error instanceof Error&&error.message==="Firebase Admin is not configured";const badJson=error instanceof SyntaxError;return NextResponse.json({error:missingConfig?"Firebase server credentials are not configured":badJson?"Request body must be valid JSON":"The request could not be completed"},{status:missingConfig?503:badJson?400:500});}
