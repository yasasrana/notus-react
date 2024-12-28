import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "components/Navbars/AuthNavbar.js";
import FooterSmall from "components/Footers/FooterSmall.js";
import Login from "views/auth/Login";
import Register from "views/auth/Register";
import { Toaster } from "react-hot-toast";

export default function Auth() {
  return (
    <>
    <Toaster/>
     <Navbar transparent />
          <main>
            <section className="relative w-full h-full py-40 min-h-screen">
              <div
                className="absolute top-0 w-full h-full bg-blueGray-800 bg-no-repeat bg-full"
                style={{
                  backgroundImage:
                    "url(" + require("assets/img/register_bg_2.png").default + ")",
                }}
              ></div>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Navigate to="/auth/login" replace />} />
          </Routes>
          <FooterSmall absolute />
            </section>
          </main>
    </>
  );
}