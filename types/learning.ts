export type LearningEventType = "QUIZ_ANSWER" | "PRACTICE" | "LESSON_COMPLETED" | "PROJECT_COMPLETED" | "REVISION" | "INTERVIEW_PRACTICE";
export interface Skill { id:string; name:string; category:string; importance:number; conceptIds:string[]; description:string; }
export interface Concept { id:string; skillId:string; name:string; description:string; prerequisites:string[]; importance:number; }
export interface Question { id:string; skillId:string; conceptId:string; prompt:string; options:string[]; correctAnswer:string; explanation:string; difficulty:number; discrimination:number; tags:string[]; }
export type PublicQuestion = Omit<Question,"correctAnswer"|"explanation">;
export interface ConceptState { conceptId:string; mastery:number; confidence:number; lastPracticedAt:number|null; questionsAttempted:number; questionsCorrect:number; }
export interface DigitalTwin { userId:string; careerGoal:string; targetRoles:string[]; skillStates:Record<string,{mastery:number;retention:number;confidence:number;conceptIds:string[]}>; conceptStates:Record<string,ConceptState>; resumeScore:number; availableLearningTime:number; totalLearningEvents:number; updatedAt:number; }
export interface LearningEvent { id:string; userId:string; skillId:string; conceptId:string; eventType:LearningEventType; questionId?:string; correct?:boolean; responseTimeMs?:number; difficulty?:number; masteryAfter?:number; timestamp:number; }
export interface Recommendation { actionType:string; title:string; description:string; reason:string; estimatedMinutes:number; priority:number; skillId?:string; conceptId?:string; targetRole?:string; }
export interface GraphNode { id:string; type:"JOB"|"SKILL"|"CONCEPT"|"COURSE"; label:string; }
export interface GraphEdge { from:string; to:string; relation:"REQUIRES"|"CONTAINS"|"TAUGHT_BY"|"PREREQUISITE"; }
