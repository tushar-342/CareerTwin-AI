import { REVISION_THRESHOLDS } from "./config";
export interface RevisionItem { conceptId:string; mastery:number; retention:number; importance:number; lastPracticedAt:number|null; }
export function revisionQueue(items:RevisionItem[],now=Date.now()):RevisionItem[]{return items.filter(i=>i.lastPracticedAt!==null&&i.retention<REVISION_THRESHOLDS.optional).sort((a,b)=>{const score=(x:RevisionItem)=>((1-x.retention)*0.55+(1-x.mastery)*0.2+x.importance*0.25)+Math.min(1,(now-(x.lastPracticedAt??now))/604800000)*0.1;return score(b)-score(a)||a.conceptId.localeCompare(b.conceptId);});}
