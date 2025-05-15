import { useNavigate, Link } from "react-router-dom";
import { Sidebar, SidebarCollapse, SidebarItem, SidebarItemGroup, SidebarItems } from "flowbite-react";
import { useAuth } from "../contexts/AuthContext";
import Swal from "sweetalert2";
import { toast } from 'react-toastify';

const SidebarProfile = ({ onClose }) => {
  const { logoutUser, deleteUser } = useAuth()
  const navigate = useNavigate()

  const handleDelete = () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás recuperar una cuenta Borrada",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await toast.promise(
            deleteUser(),
            {
              pending: 'Eliminando cuenta...',
              success: 'Cuenta eliminada con éxito! 🎉',
              error: 'Error al eliminar la cuenta '
            }
          );
          //vuelve al home
          onClose()
          navigate(`/`)

        } catch (error) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo eliminar la cuenta',
            footer: error.response.data.message,
            confirmButtonText: 'Aceptar'
          })
       
        }
      }
    })
  }

  const handleEditMovie = async () => {
    const { value } = await Swal.fire({
      title: "Indique el código Tmdb",
      input: "number",
      inputLabel: "Tmdb",
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return "debe ingresar un numero";
        }
      }
    });
    if (value) {
      navigate(`/movies/editar/${value}`)
    }
  }


  return (
    <Sidebar aria-label="Default sidebar example " className="w-65  bg-gray-200 hover:bg-gray-300 dark:bg-gray-800  top-15 right-0 z-50 ">
      <SidebarItems>
        <SidebarItemGroup>


          <Link to="/profiles" className="flex items-center rounded-lg p-2 text-black px-7 hover:bg-gray-300 dark:text-gray-100 hover:dark:bg-gray-700 cursosr-pointer" onClick={onClose}>
            <i className="bi bi-people pr-2" />  Cambiar de perfil
          </Link>




          <Link to="/movies/milista" className="flex  text-black rounded-lg p-2 text-black px-7 hover:bg-gray-300 dark:text-gray-100 hover:dark:bg-gray-700 cursosr-pointer" onClick={onClose}>
            <i className="bi bi-list-stars pr-2" /> Mi lista
          </Link>


          <SidebarCollapse label='Cuenta' className='px-0 hover:bg-gray-300'>

            <SidebarItem onClick={handleDelete} className="px-4 cursor-pointer hover:bg-gray-300">
              <i className="bi bi-person-x pr-2" />Borrar Cuenta
            </SidebarItem>

            <Link to="/cambiarpassword" className="flex items-center rounded-lg p-2 text-black px-7 hover:bg-gray-300 dark:text-gray-100 hover:dark:bg-gray-700 cursosr-pointer" onClick={onClose}>
              <i className="bi bi-pass pr-2" />Cambiar contraseña
            </Link>

          </SidebarCollapse>
          <SidebarCollapse label='Administración' className="px-0 hover:bg-gray-300">

            <Link to="/users" className="flex items-center rounded-lg p-2 text-black px-7 hover:bg-gray-300 dark:text-gray-100 hover:dark:bg-gray-700 cursosr-pointer" onClick={onClose}>
              <i className="bi bi-person pr-2" />Editar usuario
            </Link>
            <SidebarItem onClick={handleEditMovie} className="px-4 cursor-pointer hover:bg-gray-300" >
              <i className="bi bi-film pr-2" />Editar película
            </SidebarItem>

            <Link to="/movies/agregar" className="flex items-center rounded-lg p-2 text-black px-7 hover:bg-gray-300 dark:text-gray-100 hover:dark:bg-gray-700 cursosr-pointer" onClick={onClose}>
              <i className="bi bi-file-earmark-plus pr-2" />Agregar película
            </Link>

          </SidebarCollapse>
          <SidebarItem onClick={() => { logoutUser(); onClose() }} className='cursor-pointer  px-0 hover:bg-gray-300' >
            <i className="bi bi-box-arrow-left pr-2" /> Logout
          </SidebarItem>
          <SidebarItem className=" px-0">
            <div className='flex justify-center items-center px-0'>
              <i className="bi bi-x-square dark:text-red-600 text-md cursor-pointer p-0 m-0" onClick={onClose}></i>
            </div>
          </SidebarItem>
        </SidebarItemGroup>
      </SidebarItems>
    </Sidebar>
  );
}

export default SidebarProfile;