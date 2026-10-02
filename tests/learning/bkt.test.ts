import {describe,expect,it} from "vitest";
import {updateBKT} from "../../lib/learning/bkt";
describe("Bayesian Knowledge Tracing",()=>{
 it("updates mastery after a correct answer",()=>{const result=updateBKT(.3,true);expect(result.updatedMastery).toBeGreaterThan(.3);expect(result.posteriorMastery).toBeGreaterThan(.3);});
 it("still models learning after an incorrect answer",()=>{const result=updateBKT(.3,false);expect(result.posteriorMastery).toBeLessThan(.3);expect(result.updatedMastery).toBeGreaterThan(result.posteriorMastery);});
 it("supports repeated evidence and keeps probabilities bounded",()=>{let p=.15;for(let i=0;i<20;i++)p=updateBKT(p,i%3!==0).updatedMastery;expect(p).toBeGreaterThan(0);expect(p).toBeLessThanOrEqual(1);});
 it("rejects invalid probability input",()=>{expect(()=>updateBKT(1.2,true)).toThrow(RangeError);});
});
