export const initialRoutes = [
  { id: 1, name: "Hostel Block A → Academic Block", pickup: "Hostel Block A", drop: "Academic Block", defaultTime: "08:30 AM" },
  { id: 2, name: "Main Gate → Library", pickup: "Main Gate", drop: "Library", defaultTime: "09:00 AM" },
  { id: 3, name: "Hostel Block B → Sports Complex", pickup: "Hostel Block B", drop: "Sports Complex", defaultTime: "17:00 PM" },
  { id: 4, name: "Academic Block → Main Gate", pickup: "Academic Block", drop: "Main Gate", defaultTime: "17:30 PM" }
];

export const initialDrivers = [
  { id: 1, name: "Raj Kumar", status: "Available", vehicle: "PB10 AB 1234", dutyStart: "08:00", dutyEnd: "16:00", breaks: ["13:00"] },
  { id: 2, name: "Amit Singh", status: "On Trip", vehicle: "PB10 CD 5678", dutyStart: "09:00", dutyEnd: "17:00", breaks: ["14:00"] },
  { id: 3, name: "Gurpreet Singh", status: "Available", vehicle: "PB10 EF 9012", dutyStart: "07:00", dutyEnd: "15:00", breaks: ["12:00"] },
  { id: 4, name: "Suresh Patel", status: "Unavailable", vehicle: "PB10 GH 3456", dutyStart: "10:00", dutyEnd: "18:00", breaks: ["15:00"] },
  { id: 5, name: "Mohammed Ali", status: "Available", vehicle: "PB10 IJ 7890", dutyStart: "08:00", dutyEnd: "16:00", breaks: ["12:30"] }
];

export const initialBookings = [
  { id: "BK001", studentId: "STU101", studentName: "Rahul Sharma", routeId: 1, routeName: "Hostel Block A → Academic Block", date: "2026-09-23", time: "08:30 AM", driverId: 2, status: "Confirmed" },
  { id: "BK002", studentId: "STU101", studentName: "Rahul Sharma", routeId: 4, routeName: "Academic Block → Main Gate", date: "2026-09-21", time: "17:30 PM", driverId: 1, status: "Completed" },
  { id: "BK003", studentId: "STU102", studentName: "Priya Das", routeId: 2, routeName: "Main Gate → Library", date: "2026-09-23", time: "09:00 AM", driverId: null, status: "Pending" },
  { id: "BK004", studentId: "STU103", studentName: "Arjun Verma", routeId: 1, routeName: "Hostel Block A → Academic Block", date: "2026-09-23", time: "08:00 AM", driverId: 1, status: "Completed" },
  { id: "BK005", studentId: "STU104", studentName: "Neha Gupta", routeId: 1, routeName: "Hostel Block A → Academic Block", date: "2026-09-23", time: "08:15 AM", driverId: 3, status: "Confirmed" },
  { id: "BK006", studentId: "STU105", studentName: "Karan Patel", routeId: 2, routeName: "Main Gate → Library", date: "2026-09-23", time: "08:45 AM", driverId: 2, status: "Confirmed" },
  { id: "BK007", studentId: "STU106", studentName: "Meera Reddy", routeId: 3, routeName: "Hostel Block B → Sports Complex", date: "2026-09-23", time: "17:00 PM", driverId: 5, status: "Confirmed" },
  { id: "BK008", studentId: "STU107", studentName: "Rohan Singh", routeId: 4, routeName: "Academic Block → Main Gate", date: "2026-09-23", time: "17:15 PM", driverId: null, status: "Pending" },
  { id: "BK009", studentId: "STU108", studentName: "Ananya Iyer", routeId: 1, routeName: "Hostel Block A → Academic Block", date: "2026-09-23", time: "09:30 AM", driverId: null, status: "Pending" },
  { id: "BK010", studentId: "STU109", studentName: "Vikram Shah", routeId: 3, routeName: "Hostel Block B → Sports Complex", date: "2026-09-23", time: "18:00 PM", driverId: 4, status: "Completed" }
];