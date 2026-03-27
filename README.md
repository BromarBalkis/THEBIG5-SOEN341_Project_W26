# MealMajor

A comprehensive meal planning and healthy living application designed to help students manage their nutrition, discover recipes, and plan weekly meals.

## Project Overview

**Course:** SOEN 341 - Software Process  
**Semester:** Winter 2026  
**Team:** THEBIG5

MealMajor is a full-stack web application that combines recipe management, weekly meal planning, and nutrition tracking to support healthy eating habits for busy students.

## Team Members

| Name | Role | GitHub Username | Student ID |
|------|------|-----------------|------------|
| Daniel Yota | Front-end/Back-end Developer | dyota0 | [ID] |
| Saib Merabet | Back-end Developer | [username] | [ID] |
| Omar Balkis | Back-end Developer | BromarBalkis | [ID] |
| Kareem Dadouche | Front-end Developer | KareemDadouche | 40226983 |
| Mcwill Buikpor | Front-end Developer | Mcwill-Ops | [ID] |

## Features

### Sprint 1: User Account Management
- User registration and authentication
- User profile management
- Dietary preferences and allergies tracking
- Secure JWT-based authentication

### Sprint 2: Recipe Management
- Create, read, update, and delete recipes
- Search recipes by title and ingredients
- Filter recipes by difficulty, time, cost, and dietary tags
- Detailed recipe pages with ingredients, steps, and nutrition info

### Sprint 3: Weekly Meal Planner
- 7-day meal planning grid (Monday-Sunday)
- Four meal types per day (Breakfast, Lunch, Dinner, Snack)
- Assign recipes to specific meal slots
- Remove meals from planner
- Navigate between different weeks

### Sprint 3: Weekly Calorie & Macro Breakdown (Unique Feature)
- Display total weekly calories and macronutrients
- Visual macro distribution pie chart (Protein, Carbs, Fat)
- Daily calorie bar chart across the week
- Real-time updates when meals are added or removed
- Average calories per day calculation

## Tech Stack

### Frontend
- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Library:** React 19
- **Charts:** Recharts
- **Icons:** Lucide React
- **State Management:** React Context API

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js 5
- **Database:** MongoDB
- **ORM:** Prisma 6
- **Authentication:** JWT (JSON Web Tokens)
- **Password Hashing:** bcrypt

## Project Structure
```
THEBIG5-SOEN341_Project_W26/
├── frontend/               # Next.js frontend application
│   ├── src/
│   │   ├── app/           # Next.js app router pages
│   │   ├── components/    # React components
│   │   ├── context/       # React Context providers
│   │   ├── lib/           # Utility functions
│   │   └── types/         # TypeScript type definitions
│   ├── public/            # Static assets
│   └── package.json
├── backend/               # Express.js backend application
│   ├── src/
│   │   ├── controllers/   # Route controllers
│   │   ├── routes/        # API routes
│   │   ├── middleware/    # Express middleware
│   │   └── db/            # Database configuration
│   ├── prisma/
│   │   └── schema.prisma  # Database schema
│   └── package.json
├── sprint1/               # Sprint 1 documentation
├── sprint2/               # Sprint 2 documentation
├── sprint3/               # Sprint 3 documentation
│   ├── minutes/           # Meeting minutes
│   ├── contributions/     # Team member contribution logs
│   └── sprint-plan.md     # Sprint planning table
└── README.md
```

## Installation and Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- MongoDB database (local or cloud)

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```env
DATABASE_URL=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

4. Generate Prisma client:
```bash
npx prisma generate
```

5. Start the development server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the frontend directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

4. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

### Running Both Servers

From the root directory:
```bash
npm run dev
```

This will start both the frontend and backend concurrently.

## API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and receive JWT token

### User Endpoints
- `GET /api/users/me` - Get current user profile (requires auth)
- `PUT /api/users/me` - Update user profile (requires auth)

### Recipe Endpoints
- `GET /api/recipes` - Get all recipes (supports filtering)
- `GET /api/recipes/:id` - Get single recipe
- `POST /api/recipes` - Create new recipe (requires auth)
- `PUT /api/recipes/:id` - Update recipe (requires auth)
- `DELETE /api/recipes/:id` - Delete recipe (requires auth)

### Meal Plan Endpoints
- `GET /api/meal-plans?weekOf=YYYY-MM-DD` - Get meal plan for specific week
- `POST /api/meal-plans/entries` - Add meal to plan (requires auth)
- `DELETE /api/meal-plans/entries/:id` - Remove meal from plan (requires auth)

## Development Workflow

### Branch Strategy
- `main` - Production-ready code
- `sprint#-clean` - Sprint development branches
- Feature branches for individual tasks

### Commit Convention
```
feat: Add new feature
fix: Bug fix
docs: Documentation changes
chore: Maintenance tasks
```

### Sprint Methodology
The team follows Agile Scrum methodology with:
- Weekly sprints
- Sprint planning meetings
- Mid-sprint check-ins
- Sprint reviews and retrospectives
- Daily progress tracking via GitHub

## Sprint Progress

### Sprint 1 (Completed)
- User authentication system
- Profile management
- Basic application setup

### Sprint 2 (Completed)
- Recipe CRUD operations
- Recipe search and filtering
- Recipe detail pages

### Sprint 3 (Completed)
- Weekly meal planner with 7-day grid
- Recipe assignment to meal slots
- Weekly macro breakdown with visual charts
- Real-time nutrition calculations

## Key Decisions

### Unique Feature Selection
Initially planned: Smart Grocery List Generation  
Changed to: Weekly Calorie & Macro Breakdown

**Rationale:**
- Better alignment with healthy living theme
- Leverages existing nutrition data in recipe schema
- Lower implementation risk
- Provides immediate visual value to users
- Natural extension of meal planning functionality

### Technology Choices
- **Next.js App Router:** Modern React framework with server components
- **Prisma ORM:** Type-safe database access for MongoDB
- **Recharts:** Flexible charting library for nutrition visualizations
- **Context API:** Simple state management without additional dependencies

## Testing

### Running Tests
```bash
# Frontend
cd frontend
npm test

# Backend
cd backend
npm test
```

Note: Unit tests are currently in development.

## Documentation

All sprint documentation is organized in sprint-specific folders:
- Sprint planning tables
- User stories (GitHub Issues)
- Task breakdowns (GitHub Issues)
- Acceptance tests (GitHub Issues)
- Meeting minutes
- Individual contribution logs

## Future Enhancements

- Grocery list generation from meal plans
- Social features (share recipes, meal plans)
- Mobile application
- Integration with fitness tracking apps
- Recipe import from popular cooking websites
- Meal prep suggestions and batch cooking guides

## License

This project is developed as part of SOEN 341 coursework at Concordia University.

## Contact

For questions or issues, please contact the team via GitHub issues or reach out to individual team members.

---

**Last Updated:** March 23, 2026  
**Version:** Sprint 3 Release
