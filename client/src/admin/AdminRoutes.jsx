import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminTicketDashboard from "./adminTicketDashboard.jsx";
import AdminTicketDetail from "./adminTicketDetail.jsx";

function AdminRoutes() {
  return (
    <div className="admin-layout flex">
      <div className="admin-content flex-grow">
        <Routes>
          <Route
            path="adminTicketDashboard"
            element={<AdminTicketDashboard />}
          />
          <Route path="adminTicketDetail" element={<AdminTicketDetail />} />
        </Routes>
      </div>
    </div>
  );
}

export default AdminRoutes;
