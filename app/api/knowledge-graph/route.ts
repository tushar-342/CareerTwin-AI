import { NextRequest,NextResponse } from "next/server";
import { authenticated } from "@/lib/api";
import { graphNodes,graphEdges } from "@/lib/learning/catalog";
export async function GET(request:NextRequest){const auth=await authenticated(request);if("response" in auth)return auth.response;return NextResponse.json({nodes:graphNodes,edges:graphEdges});}
