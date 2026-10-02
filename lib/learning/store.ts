import "server-only";
import { FieldValue } from "firebase-admin/firestore";
import { adminDb } from "@/lib/firebase/admin";
import { concepts, skills } from "@/lib/learning/catalog";
import { calculateRetention } from "@/lib/learning/forgetting";
import { BKT_DEFAULTS } from "@/lib/learning/config";
import type { ConceptState, DigitalTwin, LearningEvent, Question } from "@/types/learning";

export async function loadTwin(uid:string):Promise<DigitalTwin>{
  const db=adminDb();const profile=db.doc(`users/${uid}/digitalTwin/profile`);
  return db.runTransaction(async transaction=>{
    const snapshot=await transaction.get(profile);
    if(snapshot.exists)return snapshot.data() as DigitalTwin;
    const states:Record<string,ConceptState>={};
    for(const concept of concepts)states[concept.id]={conceptId:concept.id,mastery:BKT_DEFAULTS.pL0,confidence:0.2,lastPracticedAt:null,questionsAttempted:0,questionsCorrect:0};
    const twin:DigitalTwin={userId:uid,careerGoal:"",targetRoles:[],skillStates:{},conceptStates:states,resumeScore:0,availableLearningTime:15,totalLearningEvents:0,updatedAt:Date.now()};
    for(const skill of skills)twin.skillStates[skill.id]={mastery:BKT_DEFAULTS.pL0,retention:BKT_DEFAULTS.pL0,confidence:0.2,conceptIds:skill.conceptIds};
    transaction.create(profile,{...twin,createdAt:FieldValue.serverTimestamp()});
    return twin;
  });
}
export async function getSkillsForUser(uid:string){const twin=await loadTwin(uid);return skills.map(s=>({...s,state:{...twin.skillStates[s.id],retention:s.conceptIds.reduce((sum,id)=>{const state=twin.conceptStates[id];return sum+calculateRetention(state.mastery,state.lastPracticedAt);},0)/Math.max(1,s.conceptIds.length)},concepts:s.conceptIds.map(id=>{const c=concepts.find(x=>x.id===id)!;const state=twin.conceptStates[id];return {...c,...state,retention:calculateRetention(state.mastery,state.lastPracticedAt)};})}));}
export async function getQuestion(id:string):Promise<Question|undefined>{const snap=await adminDb().doc(`questions/${id}`).get();return snap.exists?snap.data() as Question:undefined;}
export async function getSkillQuestions(skillId:string):Promise<Question[]>{const snap=await adminDb().collection("questions").where("skillId","==",skillId).get();return snap.docs.map(d=>d.data() as Question);}
export function publicQuestion(q:Question){return {id:q.id,skillId:q.skillId,conceptId:q.conceptId,prompt:q.prompt,options:q.options,difficulty:q.difficulty,discrimination:q.discrimination,tags:q.tags};}
export async function getUserEvents(uid:string,limit=30):Promise<LearningEvent[]>{const snap=await adminDb().collection(`users/${uid}/learningEvents`).orderBy("timestamp","desc").limit(limit).get();return snap.docs.map(d=>d.data() as LearningEvent);}
