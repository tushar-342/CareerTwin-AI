"use client";
import { createContext,useContext,useEffect,useMemo,useState } from "react";
import type { User } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { auth,firebaseConfigured } from "@/lib/firebase/client";
interface AuthValue { user:User|null; loading:boolean; configured:boolean; token:()=>Promise<string|null> }
const Context=createContext<AuthValue>({user:null,loading:true,configured:false,token:async()=>null});
export function AuthProvider({children}:{children:React.ReactNode}){const [user,setUser]=useState<User|null>(null);const [loading,setLoading]=useState(true);useEffect(()=>{if(!auth){setLoading(false);return;}return onAuthStateChanged(auth,u=>{setUser(u);setLoading(false);});},[]);const value=useMemo(()=>({user,loading,configured:firebaseConfigured,token:async()=>user?user.getIdToken():null}),[user,loading]);return <Context.Provider value={value}>{children}</Context.Provider>;}
export const useAuth=()=>useContext(Context);
