import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Card, Label, TextInput } from "flowbite-react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import * as yup from 'yup';
import { useAuth } from "../contexts/AuthContext";

//validaciones
const schema = yup.object().shape({
  email: yup.string().required('el mail es obligatorio'),
  password: yup.string().required('la contraseña es obligatoria'),
})

const Login = () => {
  const { register, formState: { errors }, handleSubmit, } = useForm({ resolver: yupResolver(schema) })
  const navigate = useNavigate()

  const { loginUser } = useAuth()

  const onSubmit = async (data) => {

    try { //envia el objeto card 
      await toast.promise(
        loginUser(data),
        {
          pending: 'Ingresando...',
          error: 'Error al ingresar. Intenta nuevamente.',
        }
      );
      navigate(`/profiles`)

    } catch (error) {
      console.log('error', error)
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
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Ingresar a Nextfliks </h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email">Ingresa tu email</Label>
              </div>
              <p className='text-red-500'>{errors.email?.message}</p>
              <TextInput {...register('email', { required: true })} />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password">Ingresa tu contraseña</Label>
              </div>
              <p className='text-red-500'>{errors.password?.message}</p>
              <TextInput {...register('password', { required: true })} type="password" />
            </div>
            <div className="flex justify-between">
              <div className="flex items-center gap-2">
              </div>
              <Link to='/olvidopassword' className="text-sm text-cyan-700 hover:underline dark:text-cyan-500">
                Olvidé la contraseña
              </Link>
            </div>
            <div className="w-full">
              <Button type="submit">Ingresar</Button>
            </div>
            <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300">
              ¿No estás registrado?&nbsp;
              <Link to='/registro' className="text-cyan-700 hover:underline dark:text-cyan-500">
                Crear una cuenta
              </Link>
            </div>
          </div>
        </form>
      </ Card>
    </ div>
  );
}
export default Login