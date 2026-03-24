# Meeting Minutes - Sprint 3

**Project:** MealMajor – A Meal Prep and Healthy Living Planner  
**Course:** SOEN 341 – Winter 2026  
**Sprint:** Sprint 3  
**Duration:** March 17 - March 23, 2026

---

## Meeting 1: Sprint 3 Planning

**Date:** Monday, March 17, 2026  
**Time:** 2:00 PM – 3:30 PM  
**Meeting Type:** Sprint Planning

### Attendees

- Daniel Yota (Front/Back-end)
- Saib Merabet (Back-end)
- Omar Balkis (Back-end)
- Kareem Dadouche (Front-end)
- Mcwill Buikpor (Front-end)

### Meeting Purpose

To plan Sprint 3 development, define the meal planner feature scope, select and approve the unique feature, estimate story points, and assign tasks for the week of March 17-23.

### Summary of Discussion

The team convened for Sprint 3 planning with strong momentum from successfully completing Sprint 2's recipe management features. The primary focus was implementing the weekly meal planner functionality and selecting a unique feature that would differentiate MealMajor from standard meal planning applications.

After reviewing the five required meal planner features, the team discussed implementation approaches. It was agreed that a 7-day grid layout (Monday through Sunday) with four meal types (Breakfast, Lunch, Dinner, Snack) would provide the clearest user experience. The team emphasized the importance of making the interface intuitive and responsive across devices.

The most significant discussion centered on selecting the unique feature. Two options were proposed: Smart Grocery List Generation and Weekly Calorie & Macro Breakdown. After careful consideration, the team unanimously approved the Weekly Calorie & Macro Breakdown feature for the following reasons:

1. Better alignment with the "Healthy Living Planner" theme
2. Leverages existing Recipe nutrition data (calories, protein, carbs, fat fields already in schema)
3. Lower implementation risk compared to grocery list logic
4. Provides immediate value through visual charts and insights
5. Natural extension of meal planning functionality

The team used Planning Poker for story point estimation. Reference points were established: simple CRUD operations = 1 point, moderate UI components = 2 points, complex features with multiple interactions = 5-8 points. User Story 08 (Weekly Macro Breakdown) was estimated at 5 points due to calculation logic and visualization requirements.

Technical decisions were made regarding visualization libraries. The team confirmed that Recharts was already installed and would be used for both the macro distribution pie chart and daily calories bar chart. Color schemes were defined: protein (blue), carbs (orange), fat (red), with the primary green theme for calories.

The database schema was reviewed to confirm that Recipe already includes optional nutrition fields (nutritionCalories, nutritionProtein, nutritionCarbs, nutritionFat). No schema changes would be required for the unique feature.

### Sprint 3 Scope

**Required Features (Meal Planner):**

1. Create weekly meal plan
2. View meals in weekly grid (7 days × 4 meal types)
3. Assign recipes to specific day/meal type slots
4. Edit or remove meals from planner
5. Prevent duplicate recipes in same week

**Unique Feature:**
Weekly Calorie & Macro Breakdown

- Display total weekly calories and macros (protein, carbs, fat)
- Show macro distribution as percentages
- Visual pie chart for macro breakdown
- Visual bar chart for daily calorie distribution
- Real-time updates when meals added/removed

### Story Point Estimates

| Issue     | Title                             | Story Points | Rationale                                         |
| --------- | --------------------------------- | ------------ | ------------------------------------------------- |
| US08      | Weekly Calorie & Macro Breakdown  | 5            | Moderate complexity: calculations plus two charts |
| Task08_01 | Calculate weekly nutrition totals | 2            | Mathematical aggregation logic                    |
| Task08_02 | Macro Summary Card                | 1            | Simple display component                          |
| Task08_03 | Macro Distribution Pie Chart      | 2            | Recharts integration and formatting               |
| Task08_04 | Daily Calories Bar Chart          | 2            | Similar to pie chart                              |
| Task08_05 | Integration into Meal Planner     | 1            | Connect components to page                        |

Total Sprint Points: 9

### Task Assignments

**Mcwill Buikpor (Front-end Lead):**

- Task08_01: Weekly nutrition calculation utilities (Due: March 19)
- Task08_02: Macro Summary Card component (Due: March 20)
- Task08_03: Macro Distribution Pie Chart (Due: March 20)
- Task08_04: Daily Calories Bar Chart (Due: March 21)
- Task08_05: Integration into meal planner page (Due: March 21)
- AT08 and AT09: Acceptance testing (Due: March 22)

**Support from team:**

- Daniel: Backend meal plan API endpoints
- Saib and Omar: Database queries and optimization
- Kareem: UI/UX feedback and mobile testing

### Key Decisions

1. Unique Feature Selection: Weekly Calorie & Macro Breakdown (approved unanimously)
2. Visualization Library: Recharts for all charts
3. Color Scheme: Protein (blue), Carbs (orange), Fat (red)
4. Story Point Method: Planning Poker with team consensus
5. Sprint Duration: March 17-23 (7 days)
6. Demo Date: March 23 (end of sprint)

### Action Items

- Mcwill to create GitHub issues for US08 and all related tasks by March 17
- Mcwill to begin implementation of calculation utilities by March 19
- Daniel to review MealPlan API endpoints for nutrition data retrieval
- All team members to push commits daily to track progress
- All team members to update contribution logs with hours worked

### Next Meeting

Date: Wednesday, March 19, 2026  
Time: 2:00 PM  
Purpose: Mid-sprint progress check and blocker resolution

---

## Meeting 2: Sprint 3 Mid-Sprint Check-in

**Date:** Wednesday, March 19, 2026  
**Time:** 2:00 PM – 2:45 PM  
**Meeting Type:** Mid-Sprint Progress Review

### Attendees

- Daniel Yota (Front/Back-end)
- Saib Merabet (Back-end)
- Omar Balkis (Back-end)
- Kareem Dadouche (Front-end)
- Mcwill Buikpor (Front-end)

### Meeting Purpose

To review Sprint 3 progress, discuss any blockers or challenges, verify task completion status, and adjust timeline if necessary.

### Summary of Discussion

The team convened for a mid-sprint review to assess progress on the Weekly Macro Breakdown feature. Overall progress was strong, with foundational work completed ahead of schedule.

Mcwill reported successful completion of Task08_01 (calculation utilities). The team reviewed the calculation logic for aggregating nutrition data from multiple recipes and converting macro grams to percentages based on caloric values (protein: 4 cal/g, carbs: 4 cal/g, fat: 9 cal/g). The formulas were validated and approved.

Progress on UI components was discussed. The Macro Summary Card (Task08_02) was in progress with good visual design matching the green theme. The team provided feedback on layout and typography, suggesting a 2×2 grid for displaying the four macro values with the average calories per day prominently displayed below.

A technical discussion arose regarding data flow from the meal plan to the macro breakdown components. The team confirmed that MealPlanContext would provide the necessary data through useMemo hooks to ensure efficient recalculation only when meals change. This approach would support the real-time update requirement.

Mock data strategy was reviewed. Since the app currently uses mock recipes as fallback when the backend is unavailable, the team confirmed that all six mock recipes include complete nutrition data. This allows full testing of the macro breakdown feature without requiring backend connectivity.

One minor blocker was identified: uncertainty about Recharts configuration for donut charts. Mcwill committed to reviewing Recharts documentation and examples. The team agreed that if necessary, a simpler pie chart could be used as fallback, though the donut style was preferred for aesthetic reasons.

The team discussed testing strategy for acceptance tests AT08 and AT09. Specific test data was defined: using 4 sample recipes with known nutrition values to verify calculation accuracy. The team agreed to document expected results in the acceptance test descriptions.

### Progress Update

**Completed Tasks:**

- Task08_01: Calculate weekly nutrition totals (Completed March 19)
- All GitHub issues created (issues 56-63)

**In Progress:**

- Task08_02: Macro Summary Card (50% complete, on track for March 20)
- Task08_03: Macro Distribution Pie Chart (research phase)

**Not Started:**

- Task08_04: Daily Calories Bar Chart (scheduled March 21)
- Task08_05: Integration (scheduled March 21)
- AT08 and AT09: Testing (scheduled March 22)

### Key Decisions

1. Data Flow: Use MealPlanContext with useMemo for efficient recalculation
2. Mock Data: All 6 mock recipes confirmed to have complete nutrition data
3. Chart Fallback: Donut chart preferred, but simple pie chart acceptable if needed
4. Test Data: Define 4 specific recipes with known values for acceptance testing
5. Timeline: No adjustments needed, on track for March 21 completion

### Blockers Identified

1. Recharts Donut Configuration: Minor blocker requiring documentation review
   - Owner: Mcwill
   - Resolution: Review Recharts examples by March 20

### Action Items

- Mcwill to complete Macro Summary Card component by March 20
- Mcwill to research Recharts donut chart configuration by March 20
- Mcwill to begin Macro Distribution Pie Chart implementation by March 20
- Kareem to review UI design and provide feedback
- All team members to continue logging hours in contribution logs

### Next Meeting

Date: Friday, March 21, 2026  
Time: 2:00 PM  
Purpose: Sprint review and demo preparation

---

## Meeting 3: Sprint 3 Review and Retrospective

**Date:** Friday, March 21, 2026  
**Time:** 2:00 PM – 3:15 PM  
**Meeting Type:** Sprint Review and Retrospective

### Attendees

- Daniel Yota (Front/Back-end)
- Saib Merabet (Back-end)
- Omar Balkis (Back-end)
- Kareem Dadouche (Front-end)
- Mcwill Buikpor (Front-end)

### Meeting Purpose

To review Sprint 3 deliverables, demo the Weekly Macro Breakdown feature, conduct acceptance testing, and plan documentation completion.

### Summary of Discussion

The team gathered for Sprint 3 review with all planned features successfully implemented. Mcwill provided a comprehensive demo of the Weekly Calorie & Macro Breakdown feature integrated into the meal planner page.

The demo showcased the complete user flow: navigating to the meal planner, adding recipes to different days and meal types, and observing real-time updates to the macro breakdown section. The team was impressed with the visual design and smooth functionality.

The Macro Summary Card displayed clearly with total calories (large prominent number), protein, carbs, and fat in a clean 2×2 grid. The average per day calculation was accurate. The color scheme matched the application's green theme perfectly.

The Macro Distribution Pie Chart rendered as a professional donut chart with three colored segments. The percentages were mathematically correct, and the legend was clear. Hover interactions worked smoothly, showing detailed macro information. The team particularly appreciated the clean design with Protein (blue), Carbs (orange), and Fat (red) color coding.

The Daily Calories Bar Chart displayed a 7-day view with green bars only for days containing meals. Empty days correctly showed no bars. The Y-axis scaled appropriately to the data. The responsive design was tested on mobile viewport and functioned well.

Live update testing demonstrated the feature's reactivity. When Mcwill added a new meal (Smoothie Bowl to Wednesday Dinner), the macro totals, percentages, and charts all updated immediately without page refresh. Removing a meal similarly triggered instant recalculation. The team verified AT09 acceptance criteria were met.

Acceptance test AT08 was conducted using 4 predefined recipes with known nutrition values. Manual calculation by the team confirmed that displayed totals matched expected values exactly: 1570 kcal total, with correct protein (93g), carbs (160g), and fat (61g) totals. The macro distribution percentages aligned with calculated values.

The team discussed the decision to change from the originally planned Grocery List feature to the Macro Breakdown. All members agreed this was the right call, as it better demonstrated the healthy living aspect of the application and provided more immediate user value. The decision would be documented in meeting minutes and sprint retrospective.

Technical implementation quality was reviewed. The code followed established patterns (React Context, TypeScript types, component structure). Recharts integration was clean. The calculation utilities were well-organized in a separate file with clear function names. No significant refactoring needed.

The team verified that all Sprint 3 GitHub issues (56-63) were created with proper formatting, story points, due dates, and acceptance criteria. The sprint plan table was complete and accurate.

### Demo Results

**Feature:** Weekly Calorie & Macro Breakdown

**Functionality Verified:**

- Displays total weekly calories (1570 kcal with test data)
- Displays total macros (93g protein, 160g carbs, 61g fat)
- Shows macro percentages (31% P, 49% C, 19% F)
- Renders pie chart with correct colors and legend
- Renders bar chart showing daily calorie distribution
- Updates in real-time when meals added/removed
- Shows average calories per day
- Handles empty state correctly
- Mobile responsive design works

**Acceptance Tests Passed:**

- AT08: Macro Breakdown Display - All calculations correct
- AT09: Live Updates - Updates within 1 second, no refresh needed

### Sprint 3 Completion Status

User Stories: 1/1 completed (US08)  
Tasks: 5/5 completed (Task08_01 through Task08_05)  
Acceptance Tests: 2/2 passed (AT08, AT09)  
Story Points: 9/9 completed (100% velocity)

All deliverables met or exceeded requirements.

### Key Decisions

1. Feature Change Approval: Team unanimously approved the switch from Grocery List to Macro Breakdown as the unique feature
2. Documentation Priority: Complete meeting minutes, contribution logs, and sprint plan by March 23
3. Code Review: No major refactoring needed, code quality approved
4. Demo Readiness: Feature is demo-ready for Sprint 3 presentation

### Retrospective: What Went Well

- Strong individual contribution from Mcwill on frontend implementation
- Excellent visual design matching application theme
- All tasks completed on or ahead of schedule
- Recharts integration was smooth and effective
- Real-time updates working perfectly
- Good coordination between frontend and backend teams
- Mock data strategy allowed full feature testing

### Retrospective: What Could Be Improved

- Earlier decision on unique feature would have saved planning time
- More frequent check-ins during implementation week
- Better initial time estimates (completed faster than expected)
- Documentation could be done incrementally rather than at sprint end

### Action Items

- Mcwill to finalize contribution log with all hours by March 28
- Mcwill to close old Grocery List issues (48-52) with explanation by March 25
- All team members to review and approve meeting minutes by March 28
- All team members to prepare for Sprint 3 demo presentation by March 28
- Team to begin planning Sprint 4 scope by March 28

### Next Steps

Sprint 3 is complete. Team will focus on documentation finalization and prepare for potential Sprint 4 work connecting the frontend to the backend API to remove mock data dependency.

**Next Meeting:**  
Date: Monday, March 28, 2026  
Time: 6:30 PM  
Purpose: Sprint 4 planning or final project review
