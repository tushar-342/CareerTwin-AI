"use client";
import {useRouter} from "next/navigation";
import Link from "next/link";
import {FormEvent,useState} from "react";
import {signInWithEmailAndPassword} from "firebase/auth";
import {auth,firebaseConfigured} from "@/lib/firebase/client";
import {AuthCard,Field} from "@/components/auth-card";
export default function Login(){const router=useRouter();const [email,setEmail]=useState("");const [password,setPassword]=useState("");const [error,setError]=useState("");const [busy,setBusy]=useState(false);async function submit(e:FormEvent){e.preventDefault();setBusy(true);setError("");try{if(!auth)throw new Error("Firebase Authentication is not configured. Add the Firebase web settings to .env.local.");await signInWithEmailAndPassword(auth,email,password);router.push("/dashboard");}catch(e){setError(e instanceof Error?e.message:"Unable to sign in");}finally{setBusy(false);}}return <AuthCard title="Welcome back" intro="Pick up where your growth left off."><form onSubmit={submit} className="space-y-4"><Field label="Email" type="email" value={email} onChange={setEmail}/><Field label="Password" type="password" value={password} onChange={setPassword}/>{error&&<p role="alert" className="text-sm text-rose-700">{error}</p>}<button disabled={busy||!firebaseConfigured} className="btn w-full disabled:opacity-50">{busy?"Signing in…":"Log in"}</button></form><p className="mt-5 text-center text-sm text-slate-500">New to CareerTwin? <Link className="font-semibold text-emerald-700" href="/signup">Create an account</Link></p></AuthCard>}
