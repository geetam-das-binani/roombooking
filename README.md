# Room Booking App

## Overview

This project is a room booking application built using the MERN stack (MongoDB, Express.js, React.js, Node.js) along with Redux Toolkit for state management, React Query for data fetching, and JWT for authentication.

## Features

- User authentication (login, signup, logout) using JWT
- Browse available rooms
- Book a room
- View booking history
- Admin Panel

## Technologies Used

- MongoDB: Database for storing room and user data
- Express.js: Backend framework for handling API requests
- React.js: Frontend library for building the user interface
- Node.js: Backend runtime environment
- Redux Toolkit: State management library for React applications
- React Query: Library for data fetching and caching
- JWT (JSON Web Tokens): Authentication mechanism for user sessions
- Cloudinary: Cloud-based image storage and management platform

- ## Installation

- Clone the repository:
- git clone[geetam-das-binani/roombooking (github.com)](https://github.com/geetam-das-binani/roombooking)
- Navigate to the project directory:
- cd room-booking-app
Install dependencies for both the client and server:
cd frontend && npm install
cd ..
cd backend && npm install
Set up environment variables:

- Create a `.env` file in the `backend` directory.
- Add the following variables:
- PORT
- MONGODB_URL
- JWT_SECRET
- CLOUD_NAME
- CLOUDINARY_API_KEY
-CLOUDINARY_API_SECRET

## Usage

- Register a new account or log in with existing credentials (JWT authentication).
- Browse available rooms with images fetched from Cloudinary.
- Select a room to book.
- View booking history.

- ## Folder Structure

- `frontend`: Frontend codebase using React.js and Redux Toolkit.
- `backend`: Backend codebase using Express.js,Node.js and MongoDB for database interactions.
