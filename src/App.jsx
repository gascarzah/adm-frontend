import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import store from "./store";
import Login from "./pages/Login";
import AuthLayout from "./layout/AuthLayout";
import { Provider } from "react-redux";
import SetupInterceptors from "./config/SetupInterceptors";
import RutaProtegida from "./layout/RutaProtegida";
import Dashboard from "./pages/Dashboard";
import ListarUsuario from "./pages/usuario";
import AgregarUsuario from "./pages/usuario/Agregar";
import EditarUsuario from "./pages/usuario/Editar";
import ListarTipoEmpleado from "./pages/tipoEmpleado";
import AgregarTipoEmpleado from "./pages/tipoEmpleado/Agregar";
import EditarTipoEmpleado from "./pages/tipoEmpleado/Editar";
import ListarEmpresa from "./pages/empresa";
import AgregarEmpresa from "./pages/empresa/Agregar";
import EditarEmpresa from "./pages/empresa/Editar";
import ListarRol from "./pages/rol";
import AgregarRol from "./pages/rol/Agregar";
import EditarRol from "./pages/rol/Editar";
import ListarMenu from "./pages/menu";
import AgregarMenu from "./pages/menu/Agregar";
import EditarMenu from "./pages/menu/Editar";

function App() {
  function NavigateFunctionComponent(props) {
    const navigate = useNavigate();
    SetupInterceptors(navigate);
    return <></>;
  }

  return (
    <Provider store={store}>
      <BrowserRouter>
        {<NavigateFunctionComponent />}
        <Routes>
          <Route path={"/"} element={<AuthLayout />}>
            <Route index element={<Login />} />
            {/* <Route path={"registrar"} element={<RegistrarUsuario />} /> */}
          </Route>
          <Route path="/dashboard" element={<RutaProtegida />}>
            <Route index element={<Dashboard />} />
            <Route path="listar-usuario" element={<ListarUsuario />} />

            <Route
              path="listar-usuario/agregar-usuario"
              element={<AgregarUsuario />}
            />
            <Route
              path="listar-usuario/editar-usuario/:id"
              element={<EditarUsuario />}
            />

            <Route
              path="listar-tipoempleado"
              element={<ListarTipoEmpleado />}
            />
            <Route
              path="listar-tipoEmpleado/agregar-tipoEmpleado"
              element={<AgregarTipoEmpleado />}
            />
            <Route
              path="listar-tipoEmpleado/editar-tipoEmpleado/:id"
              element={<EditarTipoEmpleado />}
            />
            <Route path="listar-empresa" element={<ListarEmpresa />} />
            <Route
              path="listar-empresa/agregar-empresa"
              element={<AgregarEmpresa />}
            />
            <Route
              path="listar-empresa/editar-empresa/:id"
              element={<EditarEmpresa />}
            />
            <Route path="listar-rol" element={<ListarRol />} />
            <Route path="listar-rol/agregar-rol" element={<AgregarRol />} />
            <Route path="listar-rol/editar-rol/:id" element={<EditarRol />} />

            <Route path="listar-menu" element={<ListarMenu />} />
            <Route path="listar-menu/agregar-menu" element={<AgregarMenu />} />
            <Route
              path="listar-menu/editar-menu/:id"
              element={<EditarMenu />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
