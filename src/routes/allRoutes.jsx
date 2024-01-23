import React from "react";
import { Route, Routes } from "react-router-dom";
import ItemChart from "../components/Item";
import Dashboard from "../components/Dashboard";
import Login from "../components/Login";
import { PrivateRoute } from "./privateRoute";

export const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path="/dashboard/:id" element={<ItemChart />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};
