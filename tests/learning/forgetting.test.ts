import {describe,expect,it} from "vitest";
import {calculateRetention} from "../../lib/learning/forgetting";
describe("Forgetting model",()=>{it("decays over time without changing mastery",()=>{const now=10_000_000;expect(calculateRetention(.8,now,now)).toBeCloseTo(.8);expect(calculateRetention(.8,now-10*86_400_000,now)).toBeLessThan(.8);});it("clamps future practice timestamps to current retention",()=>{expect(calculateRetention(.6,100,50)).toBeCloseTo(.6);});it("uses mastery as baseline before any observed practice",()=>{expect(calculateRetention(.9,null)).toBe(.9);});});
