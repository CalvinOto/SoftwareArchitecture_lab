# WSpeedrun — Microservices Backend

A microservices backend platform for speedrunning leaderboards, developed for the Software Architecture laboratory. The system consists of three independent services communicating with a shared MySQL database via Prisma ORM.

---

## Services Architecture

* **Auth-Service (`localhost:3000/api`):** User registration, authentication, JWT tokens, and profiles.
* **Game-Service (`localhost:3001/api`):** Game catalogs, categories, and admin CRUD operations.
* **Run-Service (`localhost:3002/api`):** Speedrun submissions, leaderboard queries, verifications, and comments.

---

## Tech Stack

* **Runtime & Framework:** Node.js, NestJS / Express
* **Database & ORM:** MySQL (`wspeedrun`), Prisma ORM
* **Documentation:** Swagger UI (OpenAPI 3.0)

---

## API Documentation (Swagger)

Once the services are running, interactive Swagger API docs are accessible at:
* Auth Service: `http://localhost:3000/api`
* Game Service: `http://localhost:3001/api`
* Run Service: `http://localhost:3002/api`

---

## How to Run Locally

### 1. Database Setup
1. Start MySQL in **phpMyAdmin / XAMPP**.
2. Create a database named `wspeedrun` and import the provided `.sql` file.

### 2. Setup and Start All Services

Run the setup and start commands in separate terminals for each service:

```bash
# Terminal 1: Auth Service
cd auth-service && npm install && npx prisma generate && npm run start

# Terminal 2: Game Service
cd game-service && npm install && npx prisma generate && npm run start

# Terminal 3: Run Service
cd run-service && npm install && npx prisma generate && npm run start
