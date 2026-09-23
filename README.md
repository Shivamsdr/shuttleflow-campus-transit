# ShuttleFlow — Smart Campus Transit Solution

ShuttleFlow is a responsive React-based web application for managing university campus shuttle services.

The application provides separate student and administrator workflows. Students can book and manage shuttle trips, while administrators can manage bookings, drivers, schedules, routes, and shuttle usage analytics.

## Features

### Student

- Book a campus shuttle
- Select pickup and drop-off routes
- Select date and time
- View upcoming bookings
- Cancel bookings
- View previous trip history
- View driver assignment status
- Receive validation and booking feedback

### Admin

#### Dashboard

- View pending bookings
- Monitor active drivers
- View today's trip activity
- Monitor active routes

#### Booking Management

- View all shuttle bookings
- View booking status
- Assign drivers to bookings
- Reassign drivers
- Cancel bookings

#### Drivers & Scheduling

- View driver availability
- View daily driver schedules
- Visualize duty hours using a timeline
- Manage driver duty hours
- Manage driver breaks
- View driver vehicles and status

#### Route Management

- View available shuttle routes
- Add campus routes
- Configure pickup and drop-off points
- Configure default route timings

#### Analytics

- Total trips
- Peak-hour demand
- Popular pickup points
- Most requested routes
- Current driver availability

## Tech Stack

- **React** — UI development
- **Vite** — Development and build tooling
- **React Router** — Application routing
- **React Context API** — Shared application state
- **Recharts** — Analytics and data visualization
- **Lucide React** — UI icons
- **CSS** — Custom responsive styling
- **LocalStorage** — Browser-based data persistence

## Application Structure

```text
src/
├── components/
│   ├── BookingCard
│   ├── Navigation
│   ├── StatusBadge
│   ├── Timeline
│   └── ...
│
├── context/
│   └── AppContext
│
├── data/
│   └── mockData
│
├── pages/
│   ├── Dashboard
│   ├── BookShuttle
│   ├── MyBookings
│   ├── TripHistory
│   │
│   └── admin/
│       ├── AdminDashboard
│       ├── BookingManagement
│       ├── DriverManagement
│       ├── DriverScheduling
│       ├── RouteManagement
│       └── Analytics
│
├── utils/
│   ├── storage
│   ├── bookingUtils
│   └── analyticsUtils
│
├── App.jsx
├── main.jsx
└── index.css
```

## State Management

The application uses the React Context API for shared application state.

The main state includes:

- Bookings
- Drivers
- Routes
- User/application state
- Administrative state

LocalStorage is used to persist application data between browser sessions.

## Driver Scheduling

The Drivers & Scheduling section provides a visual daily timeline for driver availability.

Each driver can have:

- Duty start time
- Duty end time
- Break period
- Availability status
- Assigned vehicle

The timeline is implemented using CSS Grid and displays driver schedules across hourly time slots.

## Analytics

The Analytics section provides information about shuttle usage and demand.

The dashboard includes:

- Total trips
- Peak-hour demand
- Popular pickup points
- Most requested routes
- Current driver availability

Analytics are derived from the application's booking and driver state.

## Validation & Error Handling

The application handles common booking and scheduling scenarios, including:

- Missing booking information
- Duplicate booking attempts
- Driver availability
- Driver duty hours
- Driver break periods
- Invalid booking operations
- Driver assignment availability

The interface provides feedback when an operation succeeds or cannot be completed.

## Complexity

The main operations have the following approximate complexity:

| Operation | Complexity |
|---|---|
| Driver availability lookup | `O(D)` |
| Booking submission | `O(B)` |
| Analytics calculation | `O(B)` |
| Timeline rendering | `O(D × H)` |

Where:

- `D` = number of drivers
- `B` = number of bookings
- `H` = number of timeline hours

### Space Complexity

Application state requires approximately:

```text
O(B + D + R)
```

Where:

- `B` = number of bookings
- `D` = number of drivers
- `R` = number of routes

Analytics aggregation uses additional space based on the number of unique routes and active hours being processed.

## Installation & Setup

### Prerequisites

Make sure you have the following installed:

- Node.js
- npm

### 1. Clone the repository

```bash
git clone https://github.com/Shivamsdr/shuttleflow-campus-transit.git
```

### 2. Navigate to the project

```bash
cd shuttleflow-campus-transit
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

The application will normally be available at:

```text
http://localhost:5173
```

## Production Build

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Demo Workflow

A complete demonstration can follow this workflow:

```text
Student Dashboard
       ↓
Book Shuttle
       ↓
My Bookings
       ↓
Switch to Admin
       ↓
Booking Management
       ↓
Assign Driver
       ↓
Drivers & Scheduling
       ↓
Route Management
       ↓
Analytics
```

This demonstrates the relationship between student bookings, administrative management, driver scheduling, and shuttle analytics.

## Project Scope

This project is implemented as a frontend case-study application using mock data and browser-based persistence.

The current implementation does not include:

- Backend API
- Database
- Real-time GPS tracking
- Payment processing
- External authentication

The frontend structure can be extended with backend APIs and persistent database storage in a larger production system.

## Screenshots

The application contains the following main interfaces:

- Student Dashboard
- Book Shuttle
- My Bookings
- Trip History
- Admin Dashboard
- Booking Management
- Drivers & Scheduling
- Route Management
- Analytics

Screenshots and/or a demonstration video can be added to this repository to showcase the main workflows.

## Author

**Shivam Yadav**

B.Tech — Computer Science & Engineering

## License

This project was developed as a frontend case-study project.
