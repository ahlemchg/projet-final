import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Dashboard from "./components/Dashboard.jsx";
import Products from "./components/Products.jsx";
import Orders from "./components/Orders.jsx";
import Users from "./components/Users.jsx";
import Analytics from "./components/Analytics.jsx";
import Coupons from "./components/Coupons.jsx";
import Newsletters from "./components/Newsletters.jsx";
import Login from "./components/Login.jsx";

const ProtectedRoute = ({ children }) => {
  const adminToken = localStorage.getItem("adminToken");
  const adminUser = JSON.parse(localStorage.getItem("adminUser") || "null");

  if (!adminToken || !adminUser?.isAdmin) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <Users />
            </ProtectedRoute>
          }
        />
        <Route
          path="/analytics"
          element={
            <ProtectedRoute>
              <Analytics />
            </ProtectedRoute>
          }
        />
        <Route
          path="/coupons"
          element={
            <ProtectedRoute>
              <Coupons />
            </ProtectedRoute>
          }
        />
        <Route
          path="/newsletters"
          element={
            <ProtectedRoute>
              <Newsletters />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
