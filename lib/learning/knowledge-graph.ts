import type { GraphEdge } from "@/types/learning";
export function relatedNodes(startId:string,edges:GraphEdge[],relation?:GraphEdge["relation"]):string[]{return [...new Set(edges.filter(e=>e.from===startId&&(!relation||e.relation===relation)).map(e=>e.to))].sort();}
