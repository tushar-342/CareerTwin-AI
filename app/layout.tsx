import type {Metadata} from "next";
import "./globals.css";
import {AuthProvider} from "@/components/auth-provider";
export const metadata:Metadata={title:"CareerTwin AI — Your next step, made personal",description:"Adaptive career learning grounded in your progress, goals and retention."};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body><AuthProvider>{children}</AuthProvider></body></html>;}
