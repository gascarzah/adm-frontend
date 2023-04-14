import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
// import { toast } from "react-toastify";

import { Alerta } from "../Alerta";

import {
  modificarEmpresa,
  registrarEmpresa,
  resetState,
} from "../../slices/empresaSlice";

const empresaSchema = Yup.object().shape({
  nombre: Yup.string().required("El nombre es obligatorio"),
});

const EmpresaForm = ({ empresa }) => {
  const formOptions = { resolver: yupResolver(empresaSchema) };
  const { register, formState, handleSubmit, reset, setValue } =
    useForm(formOptions);
  const { errors } = formState;
  const [alerta, setAlerta] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOnSubmit = (values, resetForm) => {
    if (!values.idEmpresa) {
      dispatch(registrarEmpresa(values))
        .unwrap()
        .then((resultado) => {
          console.log("resultado ===>> ", resultado);

          dispatch(resetState());

          navigate("/dashboard/listar-empresa");
        })
        .catch((errores) => {
          console.log("errores ===>> ", errores);
          // toast.error(errores.message);
        });
    } else {
      dispatch(modificarEmpresa(values))
        .unwrap()
        .then((resultado) => {
          console.log("resultado modificarEmpresa ===>> ", resultado);
          dispatch(resetState());
          navigate("/dashboard/listar-empresa");
        })
        .catch((errores) => {
          console.log("errores ===>> ", errores);
          // toast.error(errores.message);
        });
    }
  };

  useEffect(() => {
    if (empresa) {
      setValue("idEmpresa", empresa.idEmpresa ?? "");
      setValue("nombre", empresa.nombre ?? "");
    }
  }, [empresa]);

  const { msg } = alerta;

  return (
    <>
      {msg && <Alerta alerta={alerta} />}

      <form
        className=" my-10 bg-white shadow rounded p-10 flex flex-col w-2/5   "
        onSubmit={handleSubmit(handleOnSubmit)}
      >
        <div className="my-3">
          <label
            htmlFor="nombre"
            className="uppercase text-gray-600 block font-bold"
          >
            Nombre
          </label>
          <input
            id="nombre"
            type="text"
            placeholder="nombre"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50 "
            style={{ display: "block" }}
            name={"nombre"}
            {...register("nombre")}
          />
          {errors.nombre ? (
            <Alerta msg={errors.nombre?.message} error={true} />
          ) : null}
        </div>

        <div className="">
          <input
            type="submit"
            value="Registrar Empresa"
            className="bg-indigo-700 mb-5 w-full rounded py-3 text-white font-bold
            uppercase hover:cursor-pointer hover:bg-indigo-800 transition-colors"
          />
        </div>
      </form>
    </>
  );
};

export default EmpresaForm;
