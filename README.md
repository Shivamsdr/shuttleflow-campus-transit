cat > README.md <<'EOF'
# ShuttleFlow: Smart Campus Transit Solution

ShuttleFlow is a responsive, React-based web application designed to manage university campus shuttle services. It allows students to book rides while providing administrators with a dashboard to manage bookings, monitor shuttle usage, and manage driver schedules visually.

## Features

- **Student Booking Flow:** Intuitive interface for students to select routes, check driver availability based on the current schedule and application state, and manage their upcoming or past trips.
- **Admin Dashboard & Analytics:** High-level metrics with Recharts-powered graphs displaying Peak Hour Demand and Popular Routes directly derived from application state.
- **Visual Driver Scheduling:** A custom-built CSS Grid timeline visualizes driver duty hours and breaks. Admins can easily edit schedules and instantly see the timeline update.
- **State Management & Persistence:** Utilizes React Context API combined with `localStorage` to maintain application state without requiring a backend for the prototype.

## Tech Stack

- React + Vite
- React Router (for navigation)
- React Context API (for state management)
- Recharts (for data visualization)
- Lucide React (for lightweight iconography)
- Vanilla CSS (for a clean, custom design system without the bloat of heavy frameworks)

## Installation & Setup

1. Make sure you have Node.js installed.
2. Clone the repository and navigate into the directory.
3. Install the dependencies:

```bash
npm install
