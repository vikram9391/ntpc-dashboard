import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Contact from "./pages/Contact";
import EmployeeList from "./pages/EmployeeList";
import Feedback from "./pages/Feedback";
import User from "./pages/user";

import Navbar from "./components/Navbar";

function App() {
  const user = localStorage.getItem("user");   // ✅ changed

  return (
    <BrowserRouter>
      {user && <Navbar />}   {/* ✅ show navbar only if logged in */}

      <Routes>
  <Route path="/" element={<Login />} />

  {/* Admin Dashboard */}
  <Route
    path="/dashboard"
    element={user ? <Dashboard /> : <Navigate to="/" />}
  />

  {/* User Dashboard */}
  <Route
    path="/user"
    element={user ? <User /> : <Navigate to="/" />}
  />

  <Route
    path="/employees"
    element={user ? <EmployeeList /> : <Navigate to="/" />}
  />

  <Route
    path="/contact"
    element={user ? <Contact /> : <Navigate to="/" />}
  />

  <Route
    path="/feedback"
    element={user ? <Feedback /> : <Navigate to="/" />}
  />
</Routes>
    </BrowserRouter>
  );
}

export default App;