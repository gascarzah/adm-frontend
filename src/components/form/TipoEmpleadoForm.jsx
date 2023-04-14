import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
// import { toast } from "react-toastify";

import { Alerta } from "../Alerta";

import {
  modificarTipoEmpleado,
  registrarTipoEmpleado,
  resetState,
} from "../../slices/tipoEmpleadoSlice";

const tipoEmpleadoSchema = Yup.object().shape({
  descripcion: Yup.string().required("La descripcion es obligatoria"),
});

const TipoEmpleadoForm = ({ tipoEmpleado }) => {
  console.log("tipoempleado TipoEmpleadoForm ", tipoEmpleado);
  const formOptions = { resolver: yupResolver(tipoEmpleadoSchema) };
  const { register, formState, handleSubmit, reset, setValue } =
    useForm(formOptions);
  const { errors } = formState;
  const [alerta, setAlerta] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOnSubmit = (values) => {
    console.log("values tipoempleadoform ", values);
    if (!values.idTipoEmpleado) {
      dispatch(registrarTipoEmpleado(values))
        .unwrap()
        .then((resultado) => {
          console.log("resultado ===>> ", resultado);

          dispatch(resetState());

          navigate("/dashboard/listar-tipoempleado");
        })
        .catch((errores) => {
          console.log("errores ===>> ", errores);
          // toast.error(errores.message);
        });
    } else {
      dispatch(modificarTipoEmpleado(values))
        .unwrap()
        .then((resultado) => {
          console.log("resultado modificarTipoEmpleado ===>> ", resultado);
          dispatch(resetState());
          navigate("/dashboard/listar-tipoempleado");
        })
        .catch((errores) => {
          console.log("errores ===>> ", errores);
          // toast.error(errores.message);
        });
    }
  };

  useEffect(() => {
    if (tipoEmpleado) {
      setValue("idTipoEmpleado", tipoEmpleado.idTipoEmpleado ?? "");
      setValue("descripcion", tipoEmpleado.descripcion ?? "");
    }
  }, [tipoEmpleado]);

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
            htmlFor="descripcion"
            className="uppercase text-gray-600 block font-bold"
          >
            Descripcion
          </label>
          <input
            id="descripcion"
            type="text"
            placeholder="Descripcion"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50 "
            style={{ display: "block" }}
            name={"descripcion"}
            {...register("descripcion")}
          />
          {errors.descripcion ? (
            <Alerta msg={errors.descripcion?.message} error={true} />
          ) : null}
        </div>

        <div className="">
          <input
            type="submit"
            value="Registrar TipoEmpleado"
            className="bg-indigo-700 mb-5 w-full rounded py-3 text-white font-bold
            uppercase hover:cursor-pointer hover:bg-indigo-800 transition-colors"
          />
        </div>
      </form>
    </>
  );
};

export default TipoEmpleadoForm;
