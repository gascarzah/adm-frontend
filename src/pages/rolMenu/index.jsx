import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import Modal from "react-modal";
import { Link, Outlet } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Pagination from "../../components/Pagination";
import PreviewMenu from "../../components/PreviewMenu";
import {
  getMenusPaginado,
  getMenusPorRol,
  registrarMenu,
} from "../../slices/menuSlice";
import { useForm } from "react-hook-form";

import { getRoles } from "../../slices/rolSlice";
import PreviewRolMenu from "../../components/PreviewRolMenu";
import { registrarRolMenu } from "../../slices/rolMenuSlice";

const menuSchema = Yup.object().shape({
  idRol: Yup.string().required("El rol es obligatorio"),
});
const MantenimientoRolMenu = () => {
  const [selectedItems, setSelectedItems] = useState([]);

  const { roles } = useSelector((state) => state.rol);
  const { menus, prev, next, total } = useSelector((state) => state.menu);
  const [listMenus, setListMenus] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [disabledPrev, setDisabledPrev] = useState(false);
  const [disabledNext, setDisabledNext] = useState(false);
  const [modal, setModal] = useState(false);
  const formOptions = { resolver: yupResolver(menuSchema) };
  const { register, formState, handleSubmit, reset, setValue } =
    useForm(formOptions);
  const { errors } = formState;

  useEffect(() => {
    dispatch(getRoles());
    // dispatch(getMenusPaginado({ page: currentPage, size: itemsPerPage }));
  }, []);

  // useEffect(() => {
  //   if (menus) {
  //     setListMenus(menus);
  //     setDisabledPrev(prev);
  //     setDisabledNext(next);
  //   }
  // }, [menus, currentPage]);

  // const handlePrev = () => {
  //   console.log("handlePrev ", handlePrev);
  //   if (!disabledPrev) {
  //     const pagina = currentPage - 1;
  //     setCurrentPage(currentPage - 1);
  //     console.log("pagPrev ", currentPage);
  //     pagination(pagina);
  //   }
  // };
  // const handleNext = () => {
  //   console.log("disabledNext ", disabledNext);
  //   if (!disabledNext) {
  //     const pagina = currentPage + 1;
  //     setCurrentPage(pagina);
  //     console.log("pagNext ", currentPage);
  //     pagination(pagina);
  //   }
  // };

  // const pagination = (pagina) => {
  //   dispatch(
  //     getMenusPaginado({
  //       page: pagina,
  //       size: itemsPerPage,
  //     })
  //   );
  // };

  const handleOnSubmit = (values, resetForm) => {
    console.log("handleOnSubmit ", values);
    // if (!values.idRol) {
    dispatch(registrarRolMenu({ ...values, idsMenu: selectedItems }))
      .unwrap()
      .then((resultado) => {
        console.log("resultado ===>> ", resultado);
        dispatch(resetState());
        navigate("/dashboard/listar-menu");
      })
      .catch((errores) => {
        console.log("errores ===>> ", errores);
        // toast.error(errores.message);
      });
    // } else {
    //   dispatch(modificarRolMenu({ ...values, menuIds: selectedItems }))
    //     .unwrap()
    //     .then((resultado) => {
    //       console.log("resultado modificarMenu ===>> ", resultado);
    //       dispatch(resetState());
    //       navigate("/dashboard/listar-menu");
    //     })
    //     .catch((errores) => {
    //       console.log("errores ===>> ", errores);
    //       // toast.error(errores.message);
    //     });
    // }
  };

  const dispatch = useDispatch();

  const checkboxHandler = (e) => {
    let isSelected = e.target.checked;
    let value = parseInt(e.target.value);

    if (isSelected) {
      setSelectedItems([...selectedItems, value]);
    } else {
      setSelectedItems((prevData) => {
        return prevData.filter((id) => {
          return id !== value;
        });
      });
    }
  };

  const checkAllHandler = () => {
    if (listMenus.length === selectedItems.length) {
      setSelectedItems([]);
    } else {
      const menuIds = listMenus.map((item) => {
        return item.idMenu;
      });

      setSelectedItems(menuIds);
    }
  };

  const handleOnChange = (e) => {
    console.log("idRol");
    // const idRol = e.target.value;
    // console.log(idRol);
    // dispatch(getMenusPorRol(idRol));
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
              onChange={(e) => handleOnChange}
              style={{ display: "block" }}
              {...register("idRol")}
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
              {listMenus.length === selectedItems.length
                ? "DesSeleccionar Todos"
                : "Seleccionar Todos"}
            </button>
          </div>

          <table className="min-w-full divide-y divide-gray-200 mt-4">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                >
                  Numero
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                >
                  nombre
                </th>

                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                ></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {listMenus.length ? (
                listMenus.map((menu) => (
                  <PreviewRolMenu
                    key={menu.idMenu}
                    menu={menu}
                    selectedItems={selectedItems}
                    checkboxHandler={checkboxHandler}
                  />
                ))
              ) : (
                <tr>
                  <td>
                    <p className="text-center text-gray-600 uppercase p-5">
                      No hay menus aun
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          {/* 
          {total > 5 && (
            <Pagination
              totalPosts={listMenus.length}
              itemsPerPage={itemsPerPage}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
              handlePrev={handlePrev}
              handleNext={handleNext}
              disabledPrev={disabledPrev}
              setDisabledPrev={setDisabledPrev}
              disabledNext={disabledNext}
              setDisabledNext={setDisabledNext}
            />
          )} */}
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
