# ACE IT UP - Placement Preparation Platform

A full-stack application designed to streamline placement preparation and HR management. This platform features a modern React frontend and a robust Express/MongoDB backend.

## 🚀 Features

- **Admin Dashboard**: Comprehensive management of placement data, testimonials, and gallery.
- **Modern UI**: Built with React, Tailwind CSS, and Framer Motion for a premium user experience.
- **Secure Backend**: Express-based REST API with JWT authentication and Mongoose.
- **Data Management**: Automated scripts for verifying data, resetting admins, and testing API endpoints.

## 🛠️ Tech Stack

- **Frontend**: React (Vite), TypeScript, Tailwind CSS, shadcn/ui, TanStack Query.
- **Backend**: Node.js, Express, TypeScript, MongoDB (Mongoose).
- **Icons & UI**: Lucide React, Framer Motion, Radix UI.

## 📂 Project Structure

```text
├── backend/            # Express API Server
│   ├── src/            # Source code (Controllers, Models, Routes)
│   ├── .env.example    # Backend environment template
│   └── package.json
├── src/                # React Frontend Source
├── public/             # Static Assets
├── .env.example        # Frontend environment template
└── package.json        # Frontend configuration
```

## ⚙️ Getting Started

### Prerequisites

- Node.js (v18+)
- MongoDB (Local or Atlas)

### Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone <YOUR_REPO_URL>
   cd ace-it-up
   ```

2. **Backend Configuration**
   - Navigate to `backend/`
   - Copy `.env.example` to `.env`
   - Fill in your `MONGODB_URI` and `JWT_SECRET`.
   ```bash
   cd backend
   npm install
   npm run dev
   ```

3. **Frontend Configuration**
   - Head back to the root directory.
   - Copy `.env.example` to `.env`
   - Ensure `VITE_API_URL` points to your backend.
   ```bash
   npm install
   npm run dev
   ```

## 📜 Available Scripts

### Root (Frontend)
- `npm run dev`: Starts the Vite development server.
- `npm run build`: Builds the production-ready bundle.
- `npm run lint`: Checks for linting errors.

### Backend
- `npm run dev`: Starts the backend server with auto-reload (ts-node-dev).
- `npm run build`: Compiles TypeScript to JavaScript.
- `npm run start`: Runs the production build.

## 🛡️ Security
The `.env` files are ignored by Git. Always refer to `.env.example` when setting up a new environment.

---
Built with ❤️ for ACE IT UP.
