# Repository Organization – Sprint 4

## Overview

The project is organized in a clear and simple way, separating frontend, backend, and documentation. This makes the project easy to understand and maintain.

---

## Structure

```plaintext
/project
  /.github/workflows
  /backend
  /frontend
  /documentation
  .gitignore
  README.md
  package.json
  package-lock.json
```

---

## Explanation

- **backend/**
  Contains server-side logic such as authentication, middleware, and controllers.

- **frontend/**
  Contains the client-side application (UI, pages, and components).

- **documentation/**
  Includes sprint reports, meeting minutes, logs, and SonarQube fixes.

- **.github/workflows/**
  Contains CI/CD pipelines used to automatically run tests and checks.

- **Root files**
  Files like `package.json`, `.gitignore`, and `README.md` manage dependencies, version control, and project information.

---

## Organization Principles

- **Separation of concerns**
  Frontend and backend are clearly separated.

- **Modular structure**
  Code is grouped by functionality (e.g., authentication, UI components).

- **Testing & CI/CD**
  Automated tests run through GitHub Actions to ensure code quality.

- **Documentation**
  All development work, including SonarQube fixes, is documented in a structured way.

---

## Conclusion

The repository follows good organization practices. The structure is simple, clear, and aligned with Appendix A guidelines, making the project easy to maintain and extend.
