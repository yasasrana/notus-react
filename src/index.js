import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Landing from "views/Landing.js";
import Profile from "views/Profile.js";
import Index from "views/Index.js";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";
import Admin from "layouts/Admin.js";
import Auth from "layouts/Auth.js";
import RequireAuth from "components/RequireAuth";
import { AuthProvider } from "context/AuthProvider";
import Login from "views/auth/Login";
import Register from "views/auth/Register";

ReactDOM.render(
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        {/* add routes with layouts */}
        <Route element={<RequireAuth />}>
          <Route path="/admin/*" element={<Admin />} />
        </Route>
        <Route path="/auth/*" element={<Auth />} />
        <Route path="*" element={<Navigate to="/auth/*" replace />} />
      </Routes>
    </BrowserRouter>
  </AuthProvider>,
  document.getElementById("root")
);