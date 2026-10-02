import { applicationDefault,cert,getApps,initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

function getAdminApp() {
  const existing=getApps()[0]; if(existing)return existing;
  const projectId=process.env.FIREBASE_PROJECT_ID||process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  if(!projectId)throw new Error("Firebase Admin is not configured");
  const email=process.env.FIREBASE_CLIENT_EMAIL; const key=process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g,"\n");
  return initializeApp({credential:email&&key?cert({projectId,clientEmail:email,privateKey:key}):applicationDefault(),projectId});
}
export function adminDb(){return getFirestore(getAdminApp());}
export function adminAuth(){return getAuth(getAdminApp());}
