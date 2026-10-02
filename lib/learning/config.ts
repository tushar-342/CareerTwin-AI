export const BKT_DEFAULTS = { pL0:0.15, pT:0.12, pS:0.1, pG:0.2 } as const;
export const IRT_DEFAULTS = { discrimination:1.2, guessing:0.15, minTheta:-3, maxTheta:3 } as const;
export const FORGETTING_LAMBDA_PER_DAY = 0.035;
export const REVISION_THRESHOLDS = { urgent:0.5, optional:0.75 } as const;
