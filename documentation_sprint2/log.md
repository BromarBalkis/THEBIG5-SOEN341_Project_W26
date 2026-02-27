# THEBIG5 — Sprint 2 Contribution Log

## Sprint Info
- Team: THEBIG5
- Sprint: 2
- Period: 2026-02-07 → 2026-02-27

## Summary (Totals)
| Team Member | Total Hours | Solo Hours | Pair/Team Hours | Key Contributions |
|---|---:|---:|---:|---|
| Kareem Dadouche | 10.0 | 3.0 | 7.0 | CI pipeline (solo), 1 acceptance test (solo), contributions to recipe searching/filtering, Task03 UI work, Task09 unit test support, minor front-end work |
| Omar Balkis | 9.5 | 3.5 | 6.0 | Auth (solo), contributions to dashboard and profile pages, work on User story 5, project overview |
| Name | Tasks Completed | Hours (Solo) | Hours (Pair/Team) | Contribution Summary |
|---|---|---|---|---|
| Mcwill Buikpor | 11 | 22.0 | 0.0 | Frontend architecture (solo): Initialized Next.js 14 project with TypeScript and Tailwind CSS; built complete type system (5 files) and state management with React Context API; created 10 reusable UI components with accessibility; implemented authentication flow (login/register pages with validation); developed dashboard page with stats cards and responsive layouts; established routing architecture with middleware protection; created mock data system with 6 recipes; resolved integration issues and managed Git branch conflicts. |
| Daniel Yota | 23.0 | 15.0 | 8.0 | Sprint 2 skeleton setup, backend (DB + auth), frontend page implementation, sprint coordination, workload distribution, meeting facilitation |
| Saib Merabet | 18.0 | 12.0 | 6.0 | Connecting backend to frontend, backend (DB + auth), creating everything needed in mangodb cluster (users, profiles etc) and connecting it to the frontend.


## Detailed Timestamped Log 
| Date | Start–End | Time Spent | Type (Solo/Pair/Team) | Issue/Task | Activity Details |
|---|---|---:|---|---|---|
| 2026-02-10 | 18:00–19:00 | 1.0h | **Solo** | CI Pipeline | Created CI workflow; ensured checks run automatically; validated a successful run. |
| 2026-02-12 | 16:00–17:00 | 1.0h | **Solo** | Acceptance Test | Wrote 1 acceptance test in Appendix A style for US05 (search + filter) including combined use and no-results behavior. |
| 2026-02-13 | 19:00–21:00 | 2.0h | Pair/Team | Task05_01 (#23) | Helped implement/verify recipe searching behavior; checked matching logic and expected UI results. |
| 2026-02-14 | 14:00–16:00 | 2.0h | Pair/Team | Task05_02 (#24) | Helped implement/verify filtering behavior (time/cost/difficulty); validated multi-filter narrowing and combined behavior with search. |
| 2026-02-18 | 17:00–19:00 | 2.0h | Pair/Team | Task03_02 (#18) | Contributed to login/logout UI work (screen flow/components) and reviewed behavior against requirements. |
| 2026-02-20 | 15:00–17:00 | 2.0h | Pair/Team | Task09 (#16) | Supported unit tests for auth logic (test cases, fixing failing tests, improving stability). |

## Daniel -Timestamp Log
|---|---|---:|---|---|---|
|Date	Start–End |	Time Spent |	Type (Solo/Pair/Team) |	Issue/Task | Activity Details
|2026-02-12 |	13:00–16:00 |	3.0h |	Solo |	Sprint 2 Skeleton	Built initial backend and frontend skeleton implementation; prepared base structure before distributing tasks.
|2026-02-12 |	16:00–18:00 |	2.0h |Team |	Sprint Planning	Organized and led Sprint 2 kickoff meeting; presented skeleton; distributed workload and defined responsibilities.
|2026-02-14 |	18:00–22:00 |	4.0h |	Solo |	Database Setup	Designed and configured database schema; implemented models and ensured backend integration.
|2026-02-15 |	16:00–20:00 |	4.0h |	Solo |	Authentication Implementation	Developed register and login endpoints; implemented validation and integrated authentication with database.
|2026-02-16 |	17:00–21:00 |	4.0h | Solo |	Frontend Pages	Implemented main frontend pages (register, login, dashboard); connected frontend to backend APIs.
|2026-02-18 |	17:00–20:00 |	3.0h | 	Team |	Progress Meeting	Organized and led follow-up meeting; reviewed each member’s work; resolved integration and deadline concerns.
|2026-02-21 |	14:00–17:00 |	3.0h |	Team |	Integration & Coordination	Assisted teammates with debugging and integration; ensured participation and sprint completion readiness.

## Detailed Timestamped Log

## Detailed Timestamped Log

| Date | Start-End | Time Spent | Type (Solo/Pair/Team) | Issue/Task | Activity Details |
|---|---|---|---|---|---|
| 2026-02-17 | 14:00-18:30 | 4.5h | **Solo** | Frontend Setup | Initialized Next.js 14 project with TypeScript, Tailwind CSS, and App Router; configured custom theme with primary green (#10B981) and design system. |
| 2026-02-17 | 18:30-20:00 | 1.5h | **Solo** | Type System | Created complete TypeScript type definitions across 5 files (user, recipe, meal-plan, grocery types); established type safety foundation for entire frontend. |
| 2026-02-18 | 09:00-11:30 | 2.5h | **Solo** | Utils & Constants | Implemented utility functions (formatTime, formatCost, date helpers) and app constants; created comprehensive mock data with 6 realistic recipes for development. |
| 2026-02-18 | 11:30-13:00 | 1.5h | **Solo** | State Management | Built React Context providers (AuthContext, AppContext, ToastContext) for global state management with localStorage persistence. |
| 2026-02-18 | 14:00-16:30 | 2.5h | **Solo** | UI Component Library | Created 10 reusable UI components (Button, Input, Card, Badge, Modal, Toast, LoadingSpinner, EmptyState, ConfirmModal) with Tailwind styling and accessibility. |
| 2026-02-18 | 16:30-18:00 | 1.5h | **Solo** | Layout Components | Implemented app layout structure including Header, Sidebar, and MobileNav with responsive design; established routing architecture. |
| 2026-02-19 | 10:00-12:30 | 2.5h | **Solo** | Authentication UI | Built complete login and register pages with form validation, password strength indicators, and error handling; integrated with AuthContext for mock authentication. |
| 2026-02-19 | 13:00-15:00 | 2.0h | **Solo** | Dashboard Page | Created dashboard with stats cards, quick actions, meal plan preview, and recent recipes display; implemented responsive grid layouts. |
| 2026-02-19 | 15:00-16:30 | 1.5h | **Solo** | Routing & Middleware | Set up Next.js route protection middleware with cookie-based authentication checks; configured auth and protected route groups. |
| 2026-02-20 | 09:00-10:30 | 1.5h | **Solo** | Debugging & Integration | Resolved middleware conflicts, fixed auth flow, debugged context provider integration, and corrected routing issues for production readiness. |
| 2026-02-20 | 10:30-11:00 | 0.5h | **Solo** | Git Management | Managed branch conflicts between React+Vite and Next.js versions; coordinated with team on framework decision and branch strategy. |
