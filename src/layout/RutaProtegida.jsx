import React, { useEffect, useState } from "react";

import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const RutaProtegida = ({ props }) => {
  const logged = true;

  return (
    <>
      {logged ? (
        <div className="bg-gray-100">
          <Header />

          <div className="flex ">
            <Sidebar />

            <main className="flex flex-col items-center w-full ">
              <Outlet />
            </main>
          </div>
        </div>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};

export default RutaProtegida;
