import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import Modal from "react-modal";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Pagination from "../../components/Pagination";
import PreviewMenu from "../../components/PreviewMenu";

import { useForm } from "react-hook-form";

import { getRoles } from "../../slices/rolSlice";
import { getMenusPorRol, registrarRolMenu, resetState, } from "../../slices/rolMenuSlice";

const menuSchema = Yup.object().shape({
  idRol: Yup.string().required("El rol es obligatorio"),
});
const MantenimientoRolMenu = () => {
  const [selectedItems, setSelectedItems] = useState([]);

  const { roles } = useSelector((state) => state.rol);
  const { rolMenus } = useSelector((state) => state.rolMenu);

  const formOptions = { resolver: yupResolver(menuSchema) };
  const { register, formState, handleSubmit, reset, setValue } =
    useForm(formOptions);
  const { errors } = formState;
const navigate = useNavigate();
const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetState());
    // dispatch(getMenus());
  }, []);
  useEffect(() => {
    dispatch(getRoles());
    // dispatch(getMenus());
  }, [dispatch]);
  
  useEffect(() => {
    if (rolMenus.length > 0) {
      console.log("useEffect rolMenus ", rolMenus);
      setSelectedItems(rolMenus.filter(menu => menu.activo).map(menu => menu.idMenu));
    }
  }, [rolMenus]);

  const handleOnSubmit = (values, resetForm) => {
    console.log("handleOnSubmit ", values);
    console.log("selectedItems ", selectedItems);

    dispatch(registrarRolMenu({ ...values, idsMenu: selectedItems }))
      .unwrap()
      .then((resultado) => {
        console.log("resultado ===>> ", resultado);
        dispatch(resetState());
        // navigate("/dashboard/listar-menu");
      })
      .catch((errores) => {
        console.log("errores ===>> ", errores);
      });

  };



  const checkboxHandler = (e) => {
    const value = parseInt(e.target.value);
    setSelectedItems((prev) =>
      e.target.checked ? [...prev, value] : prev.filter((id) => id !== value)
    );
  };


  const checkAllHandler = () => {
    setSelectedItems(selectedItems.length === menus.length ? [] : menus.map((menu) => menu.idMenu));
  };

  const handleOnChange = (e) => {
    
    const idRol = e.target.value;
    setValue("idRol", idRol);
    setSelectedItems([]); // Reinicia los seleccionados al cambiar de rol
    dispatch(getMenusPorRol(idRol));

    console.log("rolMenus ==> ",rolMenus )
  };

  return (
    <>
      <form
        className=" my-10 bg-white shadow rounded  flex-col  w-3/4  "
        onSubmit={handleSubmit(handleOnSubmit)}
      >
        <div className=" my-10 bg-white shadow rounded p-10 flex flex-col w-3/4  ">
          <div className="my-5  ">
            <label
              htmlFor="idRol"
              className="uppercase text-gray-600 block font-bold"
            >
              Rol
            </label>
            <select
              name="idRol"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50 "
              style={{ display: "block" }}
              {...register("idRol")}
              onChange={handleOnChange}
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
          <div className="my-5  ">
            <button
              type="button"
              onClick={checkAllHandler}
              className="relative block rounded bg-indigo-600 py-1.5 px-3 text-sm  text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
            >
              {rolMenus && rolMenus.length === selectedItems.length
                ? "DesSeleccionar Todos"
                : "Seleccionar Todos"}
            </button>
          </div>

          <div className="my-5">
        <h3 className="text-lg font-bold">Seleccionar Menús</h3>
        {rolMenus && rolMenus.length > 0 ? (
          <div className="grid grid-cols-5 gap-4">
            {rolMenus.map((menu) => (
              <label key={menu.idMenu} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  value={menu.idMenu}
                  checked={selectedItems.includes(menu.idMenu)}
                  onChange={checkboxHandler}
                  className="form-checkbox h-5 w-5 text-indigo-600"
                />
                <span className="text-gray-700">{menu.nombre}</span>
              </label>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No hay menús disponibles</p>
        )}
      </div>

        </div>
        <div className="">
          <input
            type="submit"
            value="Registrar Menu"
            className="bg-indigo-700 mb-5 w-full rounded py-3 text-white font-bold
            uppercase hover:cursor-pointer hover:bg-indigo-800 transition-colors"
          />
        </div>
      </form>
    </>
  );
};

export default MantenimientoRolMenu;
