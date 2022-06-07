import React from "react";
import DataProvide from "../Context/DataContext";
import Dashboard from '../components/Dashboard'
export default function DashboardRoutes() {
  return (
    <DataProvide>
      <Dashboard />
    </DataProvide>
  );
}
