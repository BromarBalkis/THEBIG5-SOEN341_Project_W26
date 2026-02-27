
# THEBIG5 — Sprint 2 Plan

## Sprint Info
- Team: THEBIG5
- Sprint: 2
- Period: 2026-02-07 → 2026-02-27
- Sprint goal: Deliver recipe search + filtering (US05) with Appendix A acceptance coverage, improve auth-related UI/testing tasks, and enforce Definition of Done through CI.

## Sprint Backlog (Planned Scope)
### User Stories
- US05 — Recipe Searching + Filtering (#22)
- US04 — Create, edit, and delete recipes (#19) (as needed for acceptance coverage / integration)

### Tasks
- Task05_01 — Recipe searching (#23)
- Task05_02 — Recipe filtering (#24)
- Task03_02 — Design user interface for login/logout (#18)
- Task09 — Write unit tests for registration/login/auth logic (#16)
- Acceptance Tests — Appendix A format (ATs linked to user stories/tasks)
- CI pipeline — automated checks to support Definition of Done

## Definition of Done (Sprint 2)
- Functionality implemented according to issue requirements
- Acceptance test(s) written in Appendix A style for relevant user story
- CI passes (build + tests + lint, as configured)
- Work reviewed/approved
- Feature demo-ready and no critical bugs in core flows

## Risks / Dependencies
- Recipe dataset must include multiple recipes with different attributes (name/tags/time/cost/difficulty) to validate filtering/searching
- Filter definition consistency (time/cost/difficulty) across UI + logic
- CI stability depends on correct scripts and environment setup

## Demo Plan (Sprint 2)
- Demo recipe search by keyword
- Demo filtering by time/cost/difficulty (single + multiple filters)
- Demo search + filters together
- Demo no-results state and clear/reset behavior
- Show CI passing on a PR/commit
