import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "components/Sidebar/Sidebar.js";
import AdminNavbar from "components/Navbars/AdminNavbar";
import HeaderStats from "components/Headers/HeaderStats";
import Dashboard from "views/admin/Dashboard";
import Maps from "views/admin/Maps";
import Settings from "views/admin/Settings";
import Tables from "views/admin/Tables";
import Pawn from "views/admin/Pawn";
import Payments from "views/admin/Payments";
import useAuth from "hooks/useAuth";
import Transactions from "views/admin/Transactions";
import Sidebar2 from "components/Sidebar/Sidebar2";
import Transactions2 from "views/admin/Transactions2";

export default function Admin() {
  const { setAuth, auth } = useAuth();
  return (
    <>
     {auth?.newUser?.is_admin ? <>
      <Sidebar /></> : <> <Sidebar2 />
      </>}
      <div className="relative md:ml-64 bg-blueGray-100">
        <AdminNavbar />
        {/* Header */}
        <HeaderStats />
        <div className="px-4 md:px-10 mx-auto w-full" style={{ marginTop: '-10rem' }}>
          <Routes>
          {auth?.newUser?.is_admin ? <>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/maps" element={<Maps />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/pawn" element={<Pawn />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/tables" element={<Tables />} />
            <Route path="/tables" element={<Tables />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
          </> : <>
          <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/transactions" element={<Transactions2 />} />
            <Route path="/admin" element={<Navigate to="/admin/transactions" replace />} />
          </>}
           
          </Routes>
        </div>
      </div>
    </>
  );
}