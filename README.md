# MealMajor — Full-Stack Meal Planning Platform

Full-stack meal planning and healthy living platform built with Next.js, React, TypeScript, Node.js, Express.js, MongoDB, and Prisma.

MealMajor helps users manage recipes, organize weekly meals, and track calories and macronutrients through interactive nutrition dashboards.


## 📸 Screenshots

### Weekly Meal Planner
_Add screenshot here._

### Recipe Dashboard
_Add screenshot here._

### Macro Summary Card
_Add screenshot here._

### Macro Distribution Pie Chart
_Add screenshot here._

### Daily Calories Bar Chart
_Add screenshot here._

## 🚀 Highlights

- JWT-based user authentication
- Recipe creation, editing, search, and filtering
- Weekly meal planner with breakfast, lunch, dinner, and snack slots
- Weekly calorie and macro breakdown
- Interactive pie and bar charts using Recharts
- Full-stack client-server architecture
- Agile team development using GitHub Issues, pull requests, and code reviews

## Overview

MealMajor is a full-stack web application developed as part of SOEN 341 — Software Process at Concordia University.

The platform allows users to plan meals across a weekly calendar, manage recipe information, and visualize nutrition data such as total calories, protein, carbohydrates, and fat. The application uses a Next.js frontend connected to an Express.js REST API and MongoDB database.

## Key Features

### Recipe Management
Users can create, edit, delete, search, and filter recipes based on ingredients, preparation time, difficulty, cost, and dietary tags.

### Weekly Meal Planner
Users can assign recipes to specific days and meal types, including breakfast, lunch, dinner, and snacks.

### Nutrition Analytics
The platform calculates weekly calories and macronutrients, then displays the results through interactive charts and summary cards.

### Authentication
Secure user registration and login are handled using JWT-based authentication and password hashing.

## Tech Stack

### Frontend
- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Recharts
- Lucide React
- React Context API

### Backend
- Node.js
- Express.js 5
- MongoDB
- Prisma ORM
- JWT Authentication
- bcrypt

### Dev Tools
- Git
- GitHub
- GitHub Actions
- npm

## Project Structure

```bash
mealmajor/
├── frontend/              # Next.js frontend application
│   ├── src/
│   │   ├── app/           # App Router pages
│   │   ├── components/    # React components
│   │   ├── context/       # React Context providers
│   │   ├── lib/           # Utility functions
│   │   └── types/         # TypeScript types
│   └── public/            # Static assets
├── backend/               # Express.js backend application
│   ├── src/
│   │   ├── controllers/   # Route controllers
│   │   ├── routes/        # API routes
│   │   ├── middleware/    # Authentication middleware
│   │   └── db/            # Database configuration
│   └── prisma/
│       └── schema.prisma  # Database schema
└── README.md
```

## My Contributions

- Developed frontend components for the weekly meal planner and nutrition tracking features.
- Built interactive calorie and macronutrient visualization components using Recharts.
- Implemented the weekly macro breakdown feature, including summary cards, macro distribution charts, and daily calorie charts.
- Integrated frontend pages with backend API endpoints for recipe and meal planning data.
- Participated in Agile sprint planning, GitHub Issues, pull requests, and code reviews.
- Contributed to testing, documentation, and project organization.

## Development Workflow

The project was developed using an Agile Scrum workflow with sprint planning, user stories, task breakdowns, acceptance tests, pull requests, and team code reviews.

Main development practices included:

- GitHub Issues for user stories and task tracking
- Pull requests for feature integration
- Code reviews before merging changes
- Sprint documentation and contribution logs
- GitHub Actions for CI/CD workflows

## Future Improvements

- Smart grocery list generation from weekly meal plans
- Mobile application support
- Recipe sharing between users
- Fitness tracking integration
- AI-assisted meal recommendations
- Improved nutrition goal customization
- More advanced meal filtering based on dietary restrictions

## Context

Built as part of SOEN 341 — Software Process at Concordia University by Team THEBIG5.

## License

This project was developed for academic purposes.
