import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
// import { toast, ToastContainer } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { useForm } from "react-hook-form";

import { useDispatch } from "react-redux";
import { Alerta } from "../components/Alerta";
import { login } from "../slices/authSlice";
const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Email no valido")
    .required("El email es obligatorio"),
  password: Yup.string().required("Password obligatorio"),
});

const Login = () => {
  const formOptions = { resolver: yupResolver(loginSchema) };

  const { register, formState, handleSubmit } = useForm(formOptions);
  const { errors } = formState;

  const [alerta, setAlerta] = useState({});

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOnSubmit = async (values) => {
    const { email, password } = values;

    if (password.length < 6) {
      setAlerta({
        msg: "password es muy corto, agrega minimo 6 caracteres",
        error: true,
      });

      return;
    }

    dispatch(login(values))
      .unwrap()

      .then((resultado) => {
        navigate("/dashboard");

        console.log("respuesta ", resultado);
      })
      .catch((errores) => {
        console.log("errores ===>> ", errores);

        toast.error("usuario no existe");
      });
  };

  const { msg } = alerta;

  return (
    <>
      <h1 className="text-indigo-600 text-center font-black text-6xl ">
        Inicia Sesion
      </h1>
      {/* <ToastContainer /> */}
      {msg && <Alerta msg={alerta.msg} error={alerta.error} />}

      <form
        className={"my-10 bg-white shadow rounded p-10"}
        onSubmit={handleSubmit(handleOnSubmit)}
      >
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
            placeholder="Email"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50 "
            name={"email"}
            {...register("email")}
          />
          {errors.email ? (
            <Alerta msg={errors.email?.message} error={true} />
          ) : null}
        </div>
        <div className="my-5">
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

        <input
          type="submit"
          value="Iniciar Sesion"
          className="bg-indigo-700 mb-5 w-full rounded py-3 text-white font-bold
            uppercase hover:cursor-pointer hover:bg-indigo-800 transition-colors"
        />
      </form>
    </>
  );
};

export default Login;
