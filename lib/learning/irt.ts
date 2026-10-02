import { IRT_DEFAULTS } from "./config";
import type { Question } from "@/types/learning";
export function probabilityCorrect(theta:number,difficulty:number,discrimination:number=IRT_DEFAULTS.discrimination,guessing:number=0):number {
  if(![theta,difficulty,discrimination,guessing].every(Number.isFinite)||discrimination<=0||guessing<0||guessing>=1) throw new RangeError("Invalid IRT parameters");
  const logistic=1/(1+Math.exp(-discrimination*(theta-difficulty)));
  return guessing+(1-guessing)*logistic;
}
export function itemInformation(theta:number,difficulty:number,discrimination:number=IRT_DEFAULTS.discrimination):number { const p=probabilityCorrect(theta,difficulty,discrimination); return discrimination**2*p*(1-p); }
export function estimateAbility(responses:{difficulty:number;discrimination:number;correct:boolean}[],prior=0):number {
  if(!Number.isFinite(prior))throw new RangeError("prior must be finite"); if(!responses.length)return Math.max(-3,Math.min(3,prior));
  let theta=prior;
  for(let i=0;i<20;i++){let gradient=-theta,information=1;for(const r of responses){const p=probabilityCorrect(theta,r.difficulty,r.discrimination);const a=r.discrimination;gradient+=a*((r.correct?1:0)-p);information+=a*a*p*(1-p);}theta=Math.max(-3,Math.min(3,theta+gradient/information));}
  return theta;
}
export function selectNextQuestion(candidates:Question[],theta:number,attemptedIds:string[]=[],weakConceptIds:string[]=[]):Question|undefined {
  const eligible=candidates.filter(q=>!attemptedIds.includes(q.id));
  return eligible.sort((a,b)=>{const ia=itemInformation(theta,a.difficulty,a.discrimination)+(weakConceptIds.includes(a.conceptId)?0.35:0);const ib=itemInformation(theta,b.difficulty,b.discrimination)+(weakConceptIds.includes(b.conceptId)?0.35:0);return ib-ia||a.id.localeCompare(b.id);})[0];
}
