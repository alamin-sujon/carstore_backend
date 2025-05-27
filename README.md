# Car Store

Car Store is an online platform that allows users to browse, order, update, and manage car listings. It offers a wide range of car entries, with functionalities to create, edit, delete, and track orders. Built with Node.js, Express, MongoDB, and Mongoose, it provides a seamless experience for managing car inventories and customer orders.

##Live Link: https://carstore-lake.vercel.app/

## Technologies Used

- **Node.js** - JavaScript runtime for building server-side applications.
- **Express.js** - Web framework for Node.js.
- **TypeScript** - JavaScript with type annotations.
- **MongoDB** - NoSQL database for data storage.
- **Mongoose** - MongoDB object modeling tool for Node.js.
- **ESLint** - Linter for identifying and fixing problems in JavaScript code.
- **Prettier** - Code formatter for maintaining consistent code style.

## Features
- CRUD operations for car entries
- Mongoose schema validation with proper error message
- Environment variable configuration
- Development and production modes
## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js** and **npm** installed on your machine.
- **MongoDB** instance running locally or a cloud MongoDB database.

## Getting Started

Follow these steps to set up and run the project locally.

## 1. Clone the Repository

```bash
git clone https://github.com/Al-amin07/carstore_backend.git
```

## 2. Install Dependencies

Navigate to the project directory and install the necessary dependencies:

   ```bash
   cd carstore_backend
   npm install
   ```

## 3. Set Up Environment Variables
Create a .env file in the root of the project to store environment variables, such as MongoDB URI or any secret keys. Here’s an example:
```bash
PORT=5000
DB_URL=mongodb+srv://car_store:o7rRRjAeMw1lYPzJ@cluster0.pekpvn6.mongodb.net/carStore?retryWrites=true&w=majority&appName=Cluster0
```

## 4. Run the Project
- **Development Mode**
To start the project in development mode with hot reloading:
```bash
npm run start:dev
```
- **Production Mode**
If you prefer to run the project in production mode:
```bash
npm run build
npm run start
```
