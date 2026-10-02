"use client";
import { getApp,getApps,initializeApp } from "firebase/app";
import { connectAuthEmulator,getAuth } from "firebase/auth";
const config={apiKey:process.env.NEXT_PUBLIC_FIREBASE_API_KEY,authDomain:process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,projectId:process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,appId:process.env.NEXT_PUBLIC_FIREBASE_APP_ID};
export const firebaseConfigured=Boolean(config.apiKey&&config.authDomain&&config.projectId&&config.appId);
export const auth=firebaseConfigured?getAuth(getApps().length?getApp():initializeApp(config)):null;
if(auth&&process.env.NEXT_PUBLIC_FIREBASE_AUTH_EMULATOR_HOST){const host=process.env.NEXT_PUBLIC_FIREBASE_AUTH_EMULATOR_HOST;connectAuthEmulator(auth,host.startsWith("http")?host:`http://${host}`,{disableWarnings:true});}
