import React from "react";

import { Link } from "react-router-dom";
const Sidebar = () => {
  return (
    <aside className="md:w-1/3 lg:w-1/5 xl:2-1/6 px-5 py-10">
      <div>
        <Link
          to={"listar-empresa"}
          className="bg-indigo-600 w-full p-3 text-white uppercase font-bold block mt-5 text-center rounded-lg"
        >
          Empresa
        </Link>
        <Link
          to={"listar-rol"}
          className="bg-indigo-600 w-full p-3 text-white uppercase font-bold block mt-5 text-center rounded-lg"
        >
          Roles
        </Link>
        <Link
          to={"listar-tipoEmpleado"}
          className="bg-indigo-600 w-full p-3 text-white uppercase font-bold block mt-5 text-center rounded-lg"
        >
          Tipo Empleado
        </Link>
        <Link
          to={"listar-usuario"}
          className="bg-indigo-600 w-full p-3 text-white uppercase font-bold block mt-5 text-center rounded-lg"
        >
          Usuario
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
