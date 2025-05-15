import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Card, Label, TextInput } from "flowbite-react";
import { jwtDecode } from "jwt-decode";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from 'sweetalert2';
import * as yup from 'yup';
import { useAuth } from "../contexts/AuthContext";


//validaciones
const schema = yup.object().shape({
  password: yup.string().required('la contraseña es obligatoria').min(8, 'la contraseña debe tener al menos 8 caracteres').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,32}$/, 'la contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y tener entre 8 y 32 caracteres'),
  password2: yup.string().required('la contraseña es obligatoria').oneOf([yup.ref('password'), null], 'las contraseñas no coinciden').min(8, 'la contraseña debe tener al menos 8 caracteres').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,32}$/, 'la contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y tener entre 8 y 32 caracteres'),
})


const ResetPassword = () => {
  const { register, formState: { errors }, handleSubmit, } = useForm({ resolver: yupResolver(schema) })
  const { token } = useParams()
  const { userId } = jwtDecode(token)


  const navigate = useNavigate()
  const { resetPassword } = useAuth()

  const onSubmit = async (data) => {

    try { //envia el objeto  
      await toast.promise(
        resetPassword(userId, data.password),
        {
          pending: 'Cambiando la contraseña...',
          success: 'Listo! 🎉',
          error: 'Error al cambiar la contraeña. Intenta nuevamente.',
        }
      );
      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'Contraseña cambiada!',
        confirmButtonText: 'Aceptar'
      })
      navigate(`/home`)

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


  return (

    <div className="flex flex-content items-center justify-center min-h-[calc(100vh-5rem-7.5rem)]">
      <Card className="  w-full max-w-md  rounded-lg shadow dark:bg-gray-800">
        <form className="flex max-w-md flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Establecer contraseña </h3>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="password">Ingresa tu nueva contraseña</Label>
              </div>
              <p className='text-red-500'>{errors.password?.message}</p>
              <TextInput {...register('password', { required: true })} type="password" />
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="password2">Repetí la contraseña</Label>
              </div>
              <p className='text-red-500'>{errors.password2?.message}</p>
              <TextInput {...register('password2', { required: true })} type="password" />
            </div>

            <div className="w-full">
              <Button type="submit">Aceptar</Button>
            </div>

            <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300">

              <Link to='/login' className="text-cyan-700 hover:underline dark:text-cyan-500">
                Ingresá a tu cuenta
              </Link>
            </div>
          </div>
        </form>
      </ Card>
    </div>
  );
}
export default ResetPassword