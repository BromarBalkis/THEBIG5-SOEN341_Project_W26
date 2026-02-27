# THEBIG5 — Sprint 2 Meeting Minutes

## Sprint Info
- Team: THEBIG5
- Sprint: 2
- Period: 2026-02-07 → 2026-02-27

---

## Meeting #1
- Date: 2026-02-08
- Time: 18:00–20:30
- Duration: 2.5 hours
- Mode: Online


### Agenda
1. Confirm Sprint 2 scope and assignments
2. Acceptance tests expectations (Appendix A format)
3. CI pipeline needs + Definition of Done
4. Risks/blockers

### Discussion & Updates
- Sprint 2 focus confirmed around US05 (recipe search + filtering) and supporting tasks.
- Agreement that acceptance tests must follow Appendix A style and be linked to issues.
- CI pipeline required to enforce checks before merge and support Definition of Done.

### Decisions
- Acceptance tests will include combined behaviors (search + filters together) and error/no-results cases.
- CI checks must pass before integrating changes to main (PR-based flow if used).

### Action Items
- Kareem: implement CI pipeline and validate it runs successfully.
- Team: begin Task05_01 and Task05_02 implementation; draft acceptance tests in Appendix A format.
- Team: confirm filter definitions (time/cost/difficulty) and recipe attribute data needed for testing.

---

## Meeting #2
- Date: 2026-02-13
- Time: 17:30–20:00
- Duration: 2.5 hours
- Mode: Online


### Agenda
1. Status check on US05 tasks
2. Acceptance test draft review
3. CI pipeline status
4. Identify blockers

### Discussion & Updates
- Reviewed recipe searching progress and aligned expected matching behavior.
- Reviewed recipe filtering behavior and how multiple filters should narrow results.
- Confirmed acceptance test should include: search, filter, search+filter, no matches, clear/reset.

### Decisions
- Search should visibly update results and handle no-match state clearly.
- Filters must work together and also when a search keyword is applied.

### Action Items
- Kareem: draft/finish one acceptance test in Appendix A style and link it to US05/tasks.
- Team: continue implementation and update proof links (PRs/commits/issues).

---

## Meeting #3
- Date: 2026-02-18
- Time: 18:00–20:20
- Duration: ~2.3 hours
- Mode: Online


### Agenda
1. Integration check: UI + logic (search/filters)
2. Task03 UI progress (login/logout)
3. CI/test stability status
4. Demo preparation

### Discussion & Updates
- Checked combined behavior (search + filters together) and validated expected outcomes.
- Reviewed login/logout UI needs and ensured flow matches requirements.
- Identified any failing CI/test items and agreed on fixes.

### Decisions
- Demo must include both successful matches and no-results scenarios.
- Any CI/test failures are treated as blockers for integration.

### Action Items
- Kareem: support Task03 UI and help verify behaviors.
- Team: prepare demo sequence and ensure consistent recipe attribute data exists.

---

## Meeting #4
- Date: 2026-02-25
- Time: 17:30–20:05
- Duration: ~3 hours
- Mode: Online


### Agenda
1. Final acceptance coverage check (Appendix A)
2. Final CI verification
3. Demo run-through
4. Wrap-up and remaining gaps

### Discussion & Updates
- Verified acceptance coverage against sprint scope and ensured linkage to issues.
- Verified CI workflow passes and is stable.
- Ran through demo flow: search, filter, combined, no results, clear/reset.

### Decisions
- Any missing proof links (PR/commit/issue) must be added to the contribution log.
- Demo is locked to the agreed sequence for consistency.

### Action Items
- Kareem: add proof links to contribution log entries and ensure CI evidence is captured.
- Team: finalize remaining fixes and confirm readiness.
