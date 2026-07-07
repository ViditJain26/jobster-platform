# 🚀 Jobster

Jobster is a modern, full-stack career platform designed to bridge the gap between job seekers and recruiters with real-time tracking, dynamic data pipelines, and frictionless authentication.

Designed for high performance and scalability, the application leverages a completely serverless architecture to ensure instant load times and seamless state synchronization.

---

## 🔗 Deployments & Links

- **Live Production Site:** <a href="https://jobster-gold.vercel.app" target="_blank" rel="noopener noreferrer">Launch Jobster App</a>
- **Backend Provider:** Supabase (PostgreSQL)
- **Auth System Engine:** Clerk Auth Core

---

## ⚡ Core Architecture & Engineering Highlights

- **State-Driven Authentication Flow:** Implemented robust client-side session management via Clerk, managing split-role dashboards seamlessly for both Candidate and Recruiter personas.
- **Relational Data Mapping:** Structured real-time syncing pipelines for job listings, detailed applicant profiles, tracking states, and application metrics on top of Supabase.
- **Component-Driven UI Engineering:** Designed a sleek, responsive dark-mode interface utilizing Tailwind CSS, built cleanly with decoupled components using Shadcn UI configurations.
- **Optimized Production Builds:** Packaged through Vite to guarantee asset optimization, rapid Hot Module Replacement (HMR) during staging, and clean code-splitting.

---

## 🛠️ Technology Stack

| Layer                            | Technology                     |
| :------------------------------- | :----------------------------- |
| **Frontend Framework**           | React.js (Vite Core)           |
| **Styling & UI Components**      | Tailwind CSS & Shadcn UI       |
| **Database & Infrastructure**    | Supabase Engine (PostgreSQL)   |
| **Identity & Access Management** | Clerk Authentication Services  |
| **Hosting & CI/CD**              | Vercel Serverless Architecture |

---

## ⚙️ Engineering & Replication Guide

_(Note: This repository is fully configured, dependency-initialized, and actively deployed. The documentation below is maintained exclusively for external code review and environment replication.)_

### 1. Repository Cloning

```bash
git clone [https://github.com/ViditJain26/jobster-platform.git](https://github.com/ViditJain26/jobster-platform.git)
cd jobster-platform
```
