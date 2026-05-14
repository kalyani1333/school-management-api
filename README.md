# School Management API

## Project Overview

A Node.js and MySQL backend API for managing schools and listing schools based on proximity.

---

## Features

- Add new schools
- List schools sorted by nearest distance
- Latitude and longitude validation
- REST API architecture
- MySQL database integration

---

## Tech Stack

- Node.js
- Express.js
- MySQL
- Postman

---

## Folder Structure

```bash
src/
├── config/
├── controllers/
├── routes/
├── utils/
└── app.js
```

---

## Installation

```bash
npm install
```

---

## Environment Variables

Create `.env` file:

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=school_management
```

---

## Run Project

```bash
npm run dev
```

---

## API Endpoints

### Add School

POST `/api/addSchool`

Sample Request:

```json
{
  "name": "ABC School",
  "address": "Mumbai",
  "latitude": 19.0760,
  "longitude": 72.8777
}
```

---

### List Schools

GET `/api/listSchools?latitude=19.0760&longitude=72.8777`

Returns schools sorted by nearest distance.