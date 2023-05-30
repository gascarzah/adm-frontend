import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";

import { getRoles } from "../../slices/rolSlice";
import { getEmpresas } from "../../slices/empresaSlice";
import { Alerta } from "../Alerta";
import {
  modificarUsuario,
  registrarUsuario,
  resetState,
} from "../../slices/usuarioSlice";
import { useForm } from "react-hook-form";
import { getTipoEmpleados } from "../../slices/tipoEmpleadoSlice";

const nuevoUsuarioSchema = Yup.object().shape({
  nombres: Yup.string().required("El nombre del cliente es obligatorio"),
  apellidoPaterno: Yup.string().required("Apellido Paterno obligatorio"),
  apellidoMaterno: Yup.string().required("Apellido Materno obligatorio"),
  numeroDocumento: Yup.string()
    .max(8, "Numero de documento debe tener solo 8 digitos")
    .required("Dni es obligatorio")
    .matches(/^[0-9]+$/, "Dni debe tener solo numeros"),
  email: Yup.string()
    .email("Email no valido")
    .required("El email es obligatorio"),
  // password: Yup.string().required("Password obligatorio"),
  // password2: Yup.string().required("Repetir Password obligatorio"),
  idRol: Yup.string().required("Seleccionar un rol"),
  idEmpresa: Yup.string().required("Seleccionar una empresa"),
});

const UsuarioForm = ({ usuario }) => {
  console.log("usuario form ", usuario);
  const formOptions = {
    resolver: yupResolver(nuevoUsuarioSchema),
  };
  const { register, formState, handleSubmit, reset, setValue } =
    useForm(formOptions);
  const { errors } = formState;
  const [alerta, setAlerta] = useState({});

  const { roles } = useSelector((state) => state.rol);
  const { empresas } = useSelector((state) => state.empresa);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getRoles());

    dispatch(getEmpresas());
  }, []);

  useEffect(() => {
    if (usuario) {
      //   console.log("paso ", usuario);
      setValue("idUsuario", usuario?.idUsuario ?? "");
      setValue("nombres", usuario?.empleado?.persona?.nombres ?? "");
      setValue(
        "apellidoPaterno",
        usuario?.empleado?.persona?.apellidoPaterno ?? ""
      );
      setValue(
        "apellidoMaterno",
        usuario?.empleado?.persona?.apellidoMaterno ?? ""
      );
      setValue(
        "numeroDocumento",
        usuario?.empleado?.persona?.numeroDocumento ?? ""
      );
      setValue("email", usuario?.email ?? "");
      setValue("idRol", usuario?.roles?.[0]?.idRol ?? "");
      setValue("idEmpresa", usuario?.empleado?.empresa?.idEmpresa ?? "");
      setValue("idEmpleado", usuario?.empleado?.idEmpleado ?? "");
    }
  }, [usuario]);

  const handleOnSubmit = (values) => {
    console.log("handleOnSubmit values ", values);
    // const { password, password2 } = values;

    // if (password !== password2) {
    //   console.log("passwords no son iguales");
    //   setAlerta({
    //     msg: "passwords no son iguales",
    //     error: true,
    //   });

    //   return;
    // }

    // if (password.length < 6) {
    //   setAlerta({
    //     msg: "password es muy corto, agrega minimo 6 caracteres",
    //     error: true,
    //   });

    //   return;
    // }

    if (!values.idUsuario) {
      console.log("registra");
      dispatch(registrarUsuario(values))
        .unwrap()
        .then((resultado) => {
          console.log("resultado ===>> ", resultado);
          console.log("redirecciona login");

          dispatch(resetState());
          // toast.success(resultado.message);
          reset();
          setTimeout(() => {
            navigate("/dashboard/listar-usuario");
          }, 3000);
        })
        .catch((errores) => {
          console.log("errores ===>> ", errores);
          // toast.error(errores.message);
          setAlerta({
            msg: errores,
            error: true,
          });
        });
    } else {
      console.log("Edita");
      dispatch(modificarUsuario(values))
        .unwrap()
        .then((resultado) => {
          console.log("resultado ===>> ", resultado);
          console.log("redirecciona login");

          dispatch(resetState());
          // toast.success(resultado.message);
          reset();
          setTimeout(() => {
            navigate("/dashboard/listar-usuario");
          }, 3000);
        })
        .catch((errores) => {
          console.log("errores ===>> ", errores);
          // toast.error(errores.message);
          setAlerta({
            msg: errores,
            error: true,
          });
        });
    }
  };

  const { msg } = alerta;

  return (
    <>
      {msg && <Alerta msg={alerta.msg} error={true} />}

      <form
        className=" my-10 bg-white shadow rounded p-10 flex flex-col w-2/5   "
        onSubmit={handleSubmit(handleOnSubmit)}
      >
        <div className="my-5">
          <label
            htmlFor="nombre"
            className="uppercase text-gray-600 block font-bold"
          >
            Nombre
          </label>
          <input
            id="nombres"
            type="text"
            placeholder="Nombres"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50 "
            name={"nombres"}
            // value={usuario?.empleado?.persona?.nombres ?? ""}
            {...register("nombres")}
          />
          {errors.nombres ? (
            <Alerta msg={errors.nombres?.message} error={true} />
          ) : null}
        </div>
        <div className="my-5">
          <label
            htmlFor="apellidoPaterno"
            className="uppercase text-gray-600 block font-bold"
          >
            Apellido Paterno
          </label>
          <input
            id="apellidoPaterno"
            type="text"
            placeholder="Apellido Paterno"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50 "
            name={"apellidoPaterno"}
            // value={usuario?.empleado?.persona?.apellidoPaterno ?? ""}
            {...register("apellidoPaterno")}
          />
          {errors.apellidoPaterno ? (
            <Alerta msg={errors.apellidoPaterno?.message} error={true} />
          ) : null}
        </div>
        <div className="my-5">
          <label
            htmlFor="apellidoMaterno"
            className="uppercase text-gray-600 block font-bold"
          >
            Apellido Materno
          </label>
          <input
            id="apellidoMaterno"
            type="text"
            placeholder="Apellido Materno"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50 "
            name={"apellidoMaterno"}
            {...register("apellidoMaterno")}
            // value={usuario?.empleado?.persona?.apellidoMaterno ?? ""}
          />
          {errors.apellidoMaterno ? (
            <Alerta msg={errors.apellidoMaterno?.message} error={true} />
          ) : null}
        </div>

        <div className="my-5">
          <label
            htmlFor="numeroDocumento"
            className="uppercase text-gray-600 block font-bold"
          >
            Numero de Documento
          </label>
          <input
            id="numeroDocumento"
            type="text"
            placeholder="Numero de documento"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50 "
            name={"numeroDocumento"}
            {...register("numeroDocumento")}
            // value={usuario?.empleado?.persona?.numeroDocumento ?? ""}
          />
          {errors.numeroDocumento ? (
            <Alerta msg={errors.numeroDocumento?.message} error={true} />
          ) : null}
        </div>
        <div className="my-5">
          <label
            htmlFor="email"
            className="uppercase text-gray-600 block font-bold"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email de Registro"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50 "
            name={"email"}
            {...register("email")}
            // value={usuario?.email ?? ""}
          />
          {errors.email ? (
            <Alerta msg={errors.email?.message} error={true} />
          ) : null}
        </div>
        {/* <div className="my-5">
          <label
            htmlFor="password"
            className="uppercase text-gray-600 block font-bold"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Password de Registro"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50 "
            name={"password"}
            {...register("password")}
          />
          {errors.password ? (
            <Alerta msg={errors.password?.message} error={true} />
          ) : null}
        </div>
        <div className="my-5">
          <label
            htmlFor="password2"
            className="uppercase text-gray-600 block font-bold"
          >
            Password
          </label>
          <input
            id="password2"
            type="password"
            placeholder="Password de Registro"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50 "
            name={"password2"}
            {...register("password2")}
          />
          {errors.password2 ? (
            <Alerta msg={errors.password2?.message} error={true} />
          ) : null}
        </div> */}

        <div className="my-5">
          <label
            htmlFor="idRol"
            className="uppercase text-gray-600 block font-bold"
          >
            Rol
          </label>
          <select
            name="idRol"
            // value={rol?.idRol}
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50 "
            style={{ display: "block" }}
            {...register("idRol")}
            // value={usuario?.roles[0].idRol ?? ""}
          >
            <option value="" label="Selecciona un rol">
              Select un Rol{" "}
            </option>

            {roles?.map((roles, index) => {
              return (
                <option key={roles.idRol} value={roles.idRol}>
                  {roles.nombre}
                </option>
              );
            })}
          </select>
          {errors.idRol ? (
            <Alerta msg={errors.idRol?.message} error={true} />
          ) : null}
        </div>
        <div className="my-5">
          <label
            htmlFor="idEmpresa"
            className="uppercase text-gray-600 block font-bold"
          >
            Empresa
          </label>
          <select
            name="idEmpresa"
            // value={values.idEmpresa}
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50 "
            style={{ display: "block" }}
            {...register("idEmpresa")}
            // value={usuario?.empleado?.empresa?.idEmpresa ?? ""}
          >
            <option value="" label="Selecciona una empresa">
              Select una Empresa{" "}
            </option>

            {empresas?.map((empresa, index) => {
              return (
                <option key={empresa.idEmpresa} value={empresa.idEmpresa}>
                  {empresa.nombre}
                </option>
              );
            })}
          </select>
          {errors.idEmpresa ? (
            <Alerta msg={errors.idEmpresa?.message} error={true} />
          ) : null}
        </div>

        <input
          type="submit"
          value="Crear Cuenta"
          className="bg-indigo-700 mb-5 w-full rounded py-3 text-white font-bold
            uppercase hover:cursor-pointer hover:bg-indigo-800 transition-colors"
        />
      </form>
    </>
  );
};

export default UsuarioForm;
