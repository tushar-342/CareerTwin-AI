import { FORGETTING_LAMBDA_PER_DAY } from "./config";
export function calculateRetention(mastery:number,lastPracticedAt:number|null,now=Date.now(),lambda=FORGETTING_LAMBDA_PER_DAY):number {
  if(!Number.isFinite(mastery)||mastery<0||mastery>1||!Number.isFinite(now)||!Number.isFinite(lambda)||lambda<0)throw new RangeError("Invalid forgetting model input");
  if(lastPracticedAt===null)return mastery;
  const elapsedDays=Math.max(0,now-lastPracticedAt)/86_400_000;
  return Math.max(0,Math.min(1,mastery*Math.exp(-lambda*elapsedDays)));
}
