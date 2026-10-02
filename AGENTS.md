# CareerTwin-AI project guide

## Architecture
- Next.js App Router with strict TypeScript and Tailwind CSS.
- Keep domain algorithms deterministic and independent in `lib/learning`; API handlers own auth, validation, and persistence.
- Firebase client SDK is for Authentication only. Admin SDK and all learning state writes stay server-side.
- User identity always comes from a verified Firebase ID token. Never accept user IDs, mastery, correctness, or answer keys from clients.
- Use Zod at API boundaries and safe JSON errors. Keep private Firestore paths under `users/{uid}`.
- Seed only shared catalog data, using merge writes; never overwrite user documents.

## Development
- `npm run dev`, `npm run lint`, `npm run typecheck`, `npm test`, `npm run build`, `npm run seed`.
- Add unit tests for learning algorithms and run existing validation scripts after edits.
- Never commit `.env*` except `.env.example`, service account files, build output, or dependencies.
