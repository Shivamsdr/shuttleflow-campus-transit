# ShuttleFlow: Smart Campus Transit Solution

ShuttleFlow is a responsive, React-based web application designed to manage university campus shuttle services. It allows students to seamlessly book rides while providing administrators with a sophisticated dashboard to manage bookings, track analytics, and handle driver schedules visually.

## Features

- **Student Booking Flow:** Intuitive interface for students to select routes, check real-time driver availability, and manage their upcoming or past trips.
- **Admin Dashboard & Analytics:** High-level metrics with Recharts-powered graphs displaying Peak Hour Demand and Popular Routes directly derived from application state.
- **Visual Driver Scheduling:** A custom-built CSS Grid timeline visualizes driver duty hours and breaks. Admins can easily edit schedules and instantly see the timeline update.
- **State Management & Persistence:** Utilizes React Context API combined with `localStorage` to ensure a robust, stateful experience without requiring a backend for the prototype.

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
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Complexity Estimation

To satisfy robust scaling requirements, the algorithms used for booking management and driver availability were designed with performance in mind.

### Time Complexity
- **Checking Driver Availability:** $O(D)$ where $D$ is the number of drivers. When a student selects a time, the system iterates through the driver list to find an available driver whose shift covers the requested time.
- **Booking Submission:** $O(B)$ where $B$ is the number of existing bookings. The system checks for duplicate bookings by the same student at the same time before pushing the new record.
- **Analytics Aggregation:** $O(B)$. Generating the "Peak Hour Demand" and "Popular Routes" charts requires a single pass over the bookings array to group and reduce the data.
- **Overall UI Rendering:** Most list renders (like the Driver Timeline) are $O(D \times H)$ where $D$ is drivers and $H$ is the number of hours displayed (15 hours). This ensures completely lag-free rendering even with dozens of drivers.

### Space Complexity
- **Application State:** $O(B + D + R)$ where $B$ is bookings, $D$ is drivers, and $R$ is routes. This data is held in the React Context and continuously mirrored to `localStorage`.
- **Analytics Processing:** The aggregation objects for the charts take $O(U)$ space where $U$ is the number of unique routes or unique active hours, which is strictly bounded and very memory-efficient.

## User Experience & Error Handling
- **Graceful Error Handling:** If a student attempts to book a shuttle when no driver is scheduled, the form intelligently disables the submit button and displays a clear inline error. Duplicate booking attempts are caught and surfaced via toast-like messages.
- **Feedback:** Uses custom status badges (Pending, Confirmed, Completed) to give users immediate feedback on the state of their requests.