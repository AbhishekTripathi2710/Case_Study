# Profile Map Application

## Description
The Profile Map Application is a full-stack web application that allows users to view and manage profiles with associated locations on a map. It features a user-friendly interface for browsing profiles, an interactive map integration, and an admin panel for managing profile data. The application uses OTP-based authentication for admin access, ensuring secure management of profile information.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features
- View a list of profiles with search and filter functionality
- Interactive map display of profile locations
- Detailed profile view with additional information
- Admin panel for CRUD operations on profiles
- OTP-based authentication for admin access
- Responsive design for various screen sizes

## Technologies Used

### Frontend
- React (with React Hooks)
- React Router for navigation
- React Query for data fetching and caching
- Tailwind CSS for styling
- Google Maps JavaScript API for map integration

### Backend
- Node.js
- Express.js for the server framework
- Nodemailer for sending OTP emails
- JSON Server for mocking a full REST API

### Development Tools
- Vite for fast development and building
- ESLint for code linting
- Prettier for code formatting


## Setup Instructions

### Prerequisites
- Node.js (v14 or later)
- npm (v6 or later)
- Google Maps API key

### Frontend Setup
1. Clone the repository:
git clone https://github.com/AbhishekTripathi2710/Case_Study.git
cd userinfo


3. Install dependencies:
npm install


4. Create a `.env` file in the root directory and add your Google Maps API key:
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here


5. Start the development server:
npm run dev


### Backend Setup
1. Navigate to the backend directory:
cd backend


2. Install dependencies:
npm install


3. Create a `.env` file in the backend directory with the following content:
PORT=5000 EMAIL_USER=your_email@gmail.com EMAIL_PASS=your_email_app_password


4. Start the backend server:
npm start


### JSON Server Setup (for mock API)
1. Install JSON Server globally:
npm install -g json-server


2. Start JSON Server (from the root directory):
json-server --watch db.json --port 3001


## API Endpoints

### Profiles API (JSON Server)
- `GET /profiles` - Fetch all profiles
- `GET /profiles/:id` - Fetch a specific profile
- `POST /profiles` - Create a new profile
- `PUT /profiles/:id` - Update a profile
- `DELETE /profiles/:id` - Delete a profile

### Admin Authentication API
- `POST /api/otp/send` - Send OTP to admin email
- `POST /api/otp/validate` - Validate OTP for admin login

## Environment Variables

### Frontend
- `VITE_GOOGLE_MAPS_API_KEY`: Your Google Maps API key

### Backend
- `PORT`: Port number for the backend server (default: 5000)
- `EMAIL_USER`: Email address for sending OTP
- `EMAIL_PASS`: App password for the email account

## Usage

1. Open your browser and navigate to `http://localhost:5173` (or the port specified by Vite).
2. Browse the list of profiles and use the search functionality to filter profiles.
3. Click on a profile card to view detailed information and see the location on the map.
4. To access the admin panel:
- Click the "Admin" button in the navigation bar.
- An OTP will be sent to the configured admin email.
- Enter the OTP on the admin login page.
5. In the admin panel, you can add, edit, or delete profiles.


## Acknowledgements
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Query](https://react-query.tanstack.com/)
- [Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript)
- [JSON Server](https://github.com/typicode/json-server)
- [Nodemailer](https://nodemailer.com/)

