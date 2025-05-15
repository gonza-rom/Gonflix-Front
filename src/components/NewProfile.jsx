import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Label, Modal, ModalBody, ModalHeader, Radio, TextInput } from "flowbite-react";
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Swal from 'sweetalert2';
import { useAuth } from "../contexts/AuthContext";
import { useProfile } from "../contexts/ProfileContext";


//validaciones
const schema = yup.object().shape({
  name: yup.string().required('debes ingresar un nombre').min(3, 'el nombre debe tener al menos 3 caracteres'),
  age: yup.number('debes ingresar un número').typeError('Debes ingresar un número válido').required('debes indicar tu edad').min(1, 'la edad debe ser mayor a 0').max(120, 'la edad no puede ser mayor a 120'),
  avatar: yup.string().required('debes seleccionar un avatar'),
})


export const NewProfile = ({ openModal, setOpenModal, id }) => {
  const { register, formState: { errors }, handleSubmit, reset, setValue } = useForm({ resolver: yupResolver(schema) })
  const [selectedAvatar, setSelectedAvatar] = useState(null); // Estado para el avatar seleccionado
  const { user } = useAuth()
  const userId = user.id
  const { createProfile, getProfiles, profiles, editProfile, profileInEdition, setProfileInEdition } = useProfile()


  const avatars = [
    "Imgur.png",
    "Imgur(1).png",
    "Imgur(2).png",
    "Imgur(3).png",
    "Imgur(4).png",
    "Imgur(5).png",
    "Imgur(6).png",
    "Imgur(7).png",
    "Imgur(8).png",
    "Imgur(9).png",
    "Imgur(10).png",
    "Imgur(11).png",
  ]

  const onSubmit = async (data) => {
    const profileData = { ...data, user: userId } //agrega el id del usuario al objeto

    try { //envia el objeto  
      if (profileInEdition) { ///si se esta editando un perfil
        await toast.promise(
          editProfile(profileInEdition._id, profileData),
          {
            pending: 'actualizando el perfil...',
            success: 'Perfil actualizado con exito! 🎉',
            error: 'Error al editar el perfil. Intenta nuevamente.',
          }
        )
      } else { /// si se esta creando un nuevo perfil
        await toast.promise(
          createProfile(profileData),
          {
            pending: 'creando el perfil...',
            success: 'Perfil creado con exito! 🎉',
            error: 'Error al crear el perfil. Intenta nuevamente.',
          })
      }
      await getProfiles(userId)
      setOpenModal(false)
      reset() //limpia el formulario
      setProfileInEdition(null)

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

  const handleClose = () => {
    setOpenModal(false)
    reset()
    setProfileInEdition(null)
  }



  useEffect(() => {//asigna los valores a los inputs
    if (profileInEdition) {
      setValue("name", profileInEdition.name)
      setValue("age", profileInEdition.age)
      setValue("avatar", profileInEdition.avatar)
      setSelectedAvatar(profileInEdition.avatar)

    }
    else {
      setValue("name", null)
      setValue("age", null)
      setSelectedAvatar(null)
      setValue("avatar", null)
    }
  }
    , [profileInEdition])

  return (
    <>
      <div className="flex flex-content items-center justify-center ">
        <Modal show={openModal} size="md" popup onClose={() => handleClose()} >
          <ModalHeader />
          <ModalBody>
            <form className="flex max-w-md flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-6">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white"> {profileInEdition ? 'Editar' : 'Nuevo'} perfil </h3>

                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="name">Nombre</Label>
                  </div>
                  <p className='text-red-500'>{errors.name?.message}</p>
                  <TextInput {...register('name', { required: true })} />
                </div>

                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="age">Edad</Label>
                  </div>
                  <p className='text-red-500'>{errors.age?.message}</p>
                  <TextInput {...register('age', { required: true })} type="number" />
                </div>

                {/* ///////    avatars */}
                <p className='text-red-500'>{errors.avatar?.message}</p>
                <p >Avatar</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {avatars.map((avatar, index) => (

                    <label
                      key={index}
                      className={`card border rounded-lg shadow-md p-4 cursor-pointer ${selectedAvatar === avatar ? "ring-4 ring-red-600" : ""
                        }`}
                      onClick={() => setSelectedAvatar(avatar)} // Actualiza el estado al hacer clic
                    >
                      <img
                        src={`/avatars/${avatar}`}
                        alt={`Avatar ${index + 1}`}
                        className="w-full h-auto rounded-lg"
                      />
                      <Radio
                        {...register("avatar", { required: true })}
                        value={avatar}
                        className="hidden"
                      />
                    </label>

                  ))}
                </div>
                {/* ///////// */}

                <div className="w-full">
                  <Button type="submit">Aceptar</Button>
                </div>

                <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300">

                </div>
              </div>
            </form>
          </ModalBody>
        </Modal>
      </div>
    </>
  );
}
