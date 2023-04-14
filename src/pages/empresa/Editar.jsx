import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { getEmpresa } from "../../slices/empresaSlice";
import EmpresaForm from "../../components/form/EmpresaForm";

const EditarEmpresa = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [empresa, setEmpresa] = useState({});
  console.log("id EditarEmpresa", id);

  useEffect(() => {
    dispatch(getEmpresa(id))
      .unwrap()
      .then((resultado) => {
        console.log("resultado ", resultado);
        setEmpresa(resultado);
      });
  }, []);

  return (
    <>
      <h1 className=" text-indigo-600 font-black text-3xl capitalize text-center">
        Editar Empresa
      </h1>

      <EmpresaForm empresa={empresa} />
    </>
  );
};

export default EditarEmpresa;
