import {AppShell} from "@/components/app-shell";
import {SkillDetail} from "@/components/learning/skill-detail";
export default async function Page({params}:{params:Promise<{skillId:string}>}){const {skillId}=await params;return <AppShell><SkillDetail skillId={skillId}/></AppShell>;}
