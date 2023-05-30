import { configureStore } from '@reduxjs/toolkit'
import usuario from './slices/usuarioSlice'
import empresa from './slices/empresaSlice'
import auth from './slices/authSlice'
import rol from './slices/rolSlice'
import maestra from './slices/maestraSlice'
import tipoEmpleado from './slices/tipoEmpleadoSlice'
import menu from './slices/menuSlice'
export default configureStore({
  reducer: {
    usuario,
    rol,
    auth,
    empresa,
    maestra,
    tipoEmpleado,
    menu
  }
})