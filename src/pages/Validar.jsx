import { Button , Card } from "flowbite-react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from 'sweetalert2';
import { useAuth } from "../contexts/AuthContext";


const Validar = () => {
  const { token } = useParams()

  const navigate = useNavigate()
  const { validarToken } = useAuth()

  const validarUsuario = async (token) => {

    try { //envia el objeto card 
      await toast.promise(
        validarToken(token),
        {
          pending: 'Verificando cuenta...',
          success: 'Cuenta verificada con éxito! 🎉',
          error: 'Error al verificar la cuenta.',
        }
      );
      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'Cuenta verificada con éxito!',
        confirmButtonText: 'Aceptar'
      })

      navigate(`/login`)

    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response.data.message,
        footer: error.message,
        confirmButtonText: 'Aceptar'
      })
      
    }
  }

  useEffect(() => {
    //verifica si el token es valido
   // validarUsuario(token)
  }, [])

  return (

    <div className="flex flex-content items-center justify-center min-h-[calc(100vh-5rem-7.5rem)]">
      <Card className="  w-full max-w-md  rounded-lg shadow dark:bg-gray-800">
         <Button onClick={()=>validarUsuario(token)}>Validar</Button>
      </ Card>
    </div>
  );
}
export default Validar
