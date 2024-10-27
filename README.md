
# Gas Slot Booking App - Frontend

This is the frontend of the Gas Slot Booking App, built using React, Vite, and Bootstrap. The app allows users to register, log in, view available gas providers, book slots for gas delivery, and manage existing bookings. It interacts with the backend via RESTful APIs.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup & Installation](#setup--installation)
- [Available Scripts](#available-scripts)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [License](#license)

## Features
- User authentication (login and registration)
- View available gas providers
- Book slots for gas delivery
- Manage existing bookings (view, update, and cancel)
- Payment integration using Razorpay
- Responsive design using Bootstrap

## Tech Stack
- **React**: For building the user interface.
- **Vite**: For fast bundling and development.
- **Bootstrap**: For responsive design.
- **Redux**: For state management.
- **Razorpay**: For payment integration.

## Setup & Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory and add the following:
   ```
   REACT_APP_API_BASE_URL=https://your-backend-url.onrender.com/api
   REACT_APP_RAZORPAY_KEY=your_razorpay_key_id
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
   The app will be running on `http://localhost:5173`.

## Available Scripts
- `npm run dev`: Runs the app in development mode.
- `npm run build`: Builds the app for production.
- `npm run preview`: Serves the production build locally.

## Environment Variables
| Variable               | Description                       |
|------------------------|-----------------------------------|
| `REACT_APP_API_BASE_URL` | Backend API URL                  |
| `REACT_APP_RAZORPAY_KEY` | Razorpay Test Key for payments   |

## Deployment
1. **Build the frontend:**
   ```bash
   npm run build
   ```
2. **Deploy on Netlify:**
   - Go to [Netlify](https://www.netlify.com/) and connect your GitHub repository.
   - Set the build command to `npm run build` and publish directory to `dist`.

## License
This project is licensed under the MIT License.
