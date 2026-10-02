import {describe,expect,it} from "vitest";
import {estimateAbility,itemInformation,probabilityCorrect,selectNextQuestion} from "../../lib/learning/irt";
import {questions} from "../../lib/learning/catalog";
describe("IRT question selection",()=>{
 it("probability increases with ability",()=>{expect(probabilityCorrect(1,0)).toBeGreaterThan(probabilityCorrect(-1,0));});
 it("is most informative near item difficulty",()=>{expect(itemInformation(0,0)).toBeGreaterThan(itemInformation(2,0));});
 it("ability reflects correct responses",()=>{expect(estimateAbility([{difficulty:0,discrimination:1,correct:true}])).toBeGreaterThan(0);});
 it("selects an unanswered question closest to ability",()=>{const selected=selectNextQuestion(questions.filter(q=>q.skillId==="react"),0,["q-hooks-1"]);expect(selected?.id).not.toBe("q-hooks-1");expect(selected).toBeDefined();});
});
