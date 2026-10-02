import { BKT_DEFAULTS } from "./config";
export interface BKTParameters { pL0:number; pT:number; pS:number; pG:number }
export interface BKTResult { previousMastery:number; posteriorMastery:number; updatedMastery:number; parameters:BKTParameters }
const probability=(value:number,name:string):number=>{if(!Number.isFinite(value)||value<0||value>1)throw new RangeError(`${name} must be between 0 and 1`);return value;};
export function updateBKT(previousMastery:number,isCorrect:boolean,parameters:Partial<BKTParameters>={}):BKTResult {
  const p={...BKT_DEFAULTS,...parameters};
  for(const [k,v] of Object.entries(p)) probability(v,k);
  const prior=probability(previousMastery,"previousMastery");
  const numerator=isCorrect?prior*(1-p.pS):prior*p.pS;
  const denominator=isCorrect?numerator+(1-prior)*p.pG:numerator+(1-prior)*(1-p.pG);
  const posterior=denominator===0?prior:numerator/denominator;
  const updated=posterior+(1-posterior)*p.pT;
  return {previousMastery:prior,posteriorMastery:posterior,updatedMastery:Math.max(0,Math.min(1,updated)),parameters:p};
}
