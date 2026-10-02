import "server-only";
import { adminAuth } from "@/lib/firebase/admin";
import type { NextRequest } from "next/server";
export async function requireUser(request:NextRequest):Promise<{uid:string}|null>{
  const header=request.headers.get("authorization");if(!header?.startsWith("Bearer "))return null;
  const firebaseAuth=adminAuth();
  try{const token=header.slice(7);const decoded=await firebaseAuth.verifyIdToken(token);return {uid:decoded.uid};}catch{return null;}
}
