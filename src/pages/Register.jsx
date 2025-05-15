import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import { Button, Label, Card, TextInput } from "flowbite-react";
import { toast } from "react-toastify";
import Swal from 'sweetalert2';


//validaciones
const schema = yup.object().shape({
  email: yup.string().required('el mail es obligatorio').email('debe ingresar un email válido').matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'debe ingresar un email válido'),
  password: yup.string().required('la contraseña es obligatoria').min(8, 'la contraseña debe tener al menos 8 caracteres').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,32}$/, 'la contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y tener entre 8 y 32 caracteres'),
  password2: yup.string().required('la contraseña es obligatoria').oneOf([yup.ref('password'), null], 'las contraseñas no coinciden').min(8, 'la contraseña debe tener al menos 8 caracteres').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,32}$/, 'la contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y tener entre 8 y 32 caracteres'),
})

const Register = () => {
  const { register, formState: { errors }, handleSubmit, } = useForm({ resolver: yupResolver(schema) })
  const { createUser } = useAuth()

  const onSubmit = async (data) => {

    try { //envia el objeto  
      await toast.promise(
        createUser(data),
        {
          pending: 'Creando cuenta...',
          success: 'Usuario creado con éxito! 🎉',
          error: 'Error al crear la cuenta. Intenta nuevamente.',
        }
      );
      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'Usuario creado con éxito!',
        text: 'Revisa tu email para validar tu cuenta',
        footer: 'Recuerda revisar la carpeta de spam',
        confirmButtonText: 'Aceptar'
      })

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
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Registrate </h3>
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

            <div>
              <div className="mb-2 block">
                <Label htmlFor="password2">Repetí la contraseña</Label>
              </div>
              <p className='text-red-500'>{errors.password2?.message}</p>
              <TextInput {...register('password2', { required: true })} type="password" />
            </div>

            <div className="w-full">
              <Button type="submit">Registrar</Button>
            </div>

            <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300">
              ¿Ya estás registrado?&nbsp;
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
export default Register