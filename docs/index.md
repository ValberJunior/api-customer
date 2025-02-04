# Customer Management API

## Overview

The **Customer Management API** is a RESTful service built with Fastify and Prisma, designed to manage customer data effectively. It provides endpoints for creating, retrieving, updating, and deleting customer records.

## Features
- **Create Customer:** Add new customer records.
- **List Customers:** Retrieve all customer records.
- **Get Customer by ID:** Fetch a specific customer using their unique ID.
- **Update Customer:** Modify customer details.
- **Delete Customer:** Remove customer records from the database.
- **Health Check:** Ensure the API is operational.

## Technologies Used
- **Node.js** with **Fastify** for high-performance API handling
- **Prisma** for database ORM
- **Swagger/OpenAPI** for API documentation

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- A running database instance (configured in `prisma` settings)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/customer-api.git
   cd customer-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```
   or
   ```bash
   yarn install
   ```

3. Set up the database:
   ```bash
   npx prisma migrate dev
   ```

4. Start the server:
   ```bash
   npm run dev
   ```

## API Endpoints

### Health Check
- **GET** `/health-check`
  - **Response:** `{ "status": "🟢 ok", "timestamp": "2024-02-03T12:34:56.789Z" }`

### Customers
- **POST** `/customer`
  - Create a new customer.
  - **Body:** `{ "name": "John Doe", "email": "john@example.com" }`

- **GET** `/customers`
  - Retrieve all customers.

- **GET** `/customer/{customerId}`
  - Get details of a specific customer by ID.

- **PATCH** `/customer`
  - Update customer information.
  - **Body:** `{ "id": "123", "name": "Jane Doe", "email": "jane@example.com" }`

- **DELETE** `/customer/{customerId}`
  - Delete a customer by ID.

## Database Schema

```prisma
model Customer {
  id         String   @id @default(auto()) @map("_id") @db.ObjectId
  name       String
  email      String
  status     Boolean
  created_at DateTime? @default(now())
  updated_at DateTime? @default(now())

  @@map("customers")
}
```

## API Documentation
The API is documented using Swagger/OpenAPI.

- Visit `http://localhost:3000/docs` after running the server to explore the interactive API documentation.

## Contributing
1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a pull request.

