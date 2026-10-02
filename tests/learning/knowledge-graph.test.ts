import {describe,expect,it} from "vitest";
import {relatedNodes} from "../../lib/learning/knowledge-graph";
import {graphEdges} from "../../lib/learning/catalog";
describe("knowledge graph",()=>{it("maps a target role to its required skills",()=>{expect(relatedNodes("frontend-developer",graphEdges,"REQUIRES")).toContain("react");});it("maps a skill to concepts",()=>{expect(relatedNodes("react",graphEdges,"CONTAINS")).toContain("react-useeffect");});});
