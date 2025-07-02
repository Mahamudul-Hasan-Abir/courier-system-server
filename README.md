# Courier System Server

## Overview

Courier System Server is a backend application designed to manage parcel delivery operations, user authentication, route optimization, and real-time updates for a courier service. Built with Node.js, Express, TypeScript, and MongoDB, it provides robust APIs for customers, agents, and administrators.

## Features
- User authentication and role management (admin, agent, customer)
- Parcel booking, tracking, and status updates
- Agent assignment and management
- Route optimization for delivery agents
- Admin dashboard with statistics and reporting (CSV/PDF export)
- Real-time updates via Socket.IO
- Secure JWT-based authentication

## Tech Stack
- **Node.js** / **Express**
- **TypeScript**
- **MongoDB** with **Mongoose**
- **Socket.IO** (real-time communication)
- **PDFKit**, **json2csv** (report generation)
- **Jest** (recommended for testing)

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- MongoDB instance (local or cloud)

### Installation
```bash
npm install
```

### Environment Variables
Create a `.env` file in the root directory with the following variables:
```
PORT=5000
DB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
SALT_ROUNDS=10
```

### Running the Server
- Development: `npm run start:dev`
- Production: `npm run build && npm start`

## Scripts
- `npm run start:dev` — Start server with hot-reload (ts-node-dev)
- `npm run build` — Compile TypeScript to JavaScript
- `npm start` — Start compiled server

## API Modules

### Auth
- **POST /api/v1/auth/register** — Register a new user
- **POST /api/v1/auth/login** — Login and receive JWT

### Parcel
- **POST /api/v1/parcel** — Create a new parcel (customer)
- **GET /api/v1/parcel/my** — Get parcels for logged-in customer
- **GET /api/v1/parcel/:id** — Get parcel details
- **GET /api/v1/parcel** — Get all parcels (admin/agent)
- **PATCH /api/v1/parcel/:id/assign** — Assign agent to parcel (admin)
- **PATCH /api/v1/parcel/:id/status** — Update parcel status/location (agent)
- **GET /api/v1/parcel/agent** — Get parcels assigned to agent

### Admin
- **GET /api/v1/admin/dashboard** — Dashboard statistics
- **GET /api/v1/admin/agents** — List all agents
- **GET /api/v1/admin/export/csv** — Export parcel report as CSV
- **GET /api/v1/admin/export/pdf** — Export parcel report as PDF

### Route Optimization
- **GET /api/v1/route-optimization/optimized** — Get optimized delivery route for agent
- **GET /api/v1/route-optimization/parcels** — Get agent's parcels

## Real-Time Features
- **Socket.IO** is used for real-time updates (e.g., parcel status changes, agent location tracking).
- Clients can join parcel-specific rooms for targeted updates.

## Deployment
- The project is ready for deployment on [Vercel](https://vercel.com/) using the provided `vercel.json`.
- The production build runs from `dist/server.js`.

## License

This project is licensed under the ISC License. 