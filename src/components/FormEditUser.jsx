import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form"
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Card, Button, Modal, ModalHeader, ModalBody, Label, Checkbox, Select } from 'flowbite-react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import Swal from 'sweetalert2'
import { toast } from "react-toastify"
//validaciones
const schema = yup.object().shape({
  role: yup.string().required('debe indicar el rol del usuario'),

})

const FormEditUser = ({ data, openModal, onCloseModal }) => {

  const { register, formState: { errors }, handleSubmit, reset } = useForm({ resolver: yupResolver(schema) })
  const { getRoles, editUser } = useAuth()
  const [roles, setRoles] = useState({})

  const onSubmit = async (formData) => {

    try { //envia el objeto  
      await toast.promise(
        editUser(data._id, formData),
        {
          pending: 'Actualizando datos de usuario...',
          success: 'Usuario actualizado con éxito! 🎉',
          error: 'Error al actualizar la Usuario. Intenta nuevamente.',
        }
      );
      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'Usuario actualizado con éxito!',
        confirmButtonText: 'Aceptar'
      })
      onCloseModal()

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

  useEffect(() => {//obtiene el listado de roles para cargar el select
    const traeRoles = async () => {
      setRoles(await getRoles())
    }

    traeRoles()
  }, [])

  useEffect(() => {/// establece los valores por defecto del formulario
    if (data) {
      reset({
        isVerified: data.isVerified,
        role: data.role
      });
    }
  }, [data])

  return (
    <Modal show={openModal} size="md" onClose={onCloseModal} popup>
      <ModalHeader />
      <ModalBody>
        <div className="space-y-6">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white text-center ">Editar Usuario </h3>
          <Card className="flex   w-full max-w-xl rounded-lg shadow dark:bg-gray-800">
            <form className="flex max-w-md flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-6">
                <h4 className="text-xl font-medium text-gray-900 dark:text-white">{data.email} </h4>

                <div className="flex flex-content flex-row">
                  <div className="w-80 ">
                    <div className="mb-2 ">
                      <p className='text-red-500'>{errors.isVerified?.message}</p>
                      <Label htmlFor="isVerified">Usuario verificado </Label>
                      <Checkbox {...register('isVerified', { required: true })} />
                    </div>
                  </div>

                  <div>
                    <div className="mb-2 block ">
                      <Label htmlFor="role">Rol</Label>
                    </div>
                    <p className='text-red-500'>{errors.role?.message}</p>
                    <Select {...register('role', { required: true })} type="text" className='w-20' >
                      {
                        roles.length > 0 && roles.map(role => (
                          <option key={role._id} value={role._id}>{role.name}</option>
                        ))
                      }
                    </Select>
                  </div>
                </div>

                <div className="w-full">
                  <Button type="submit">Guardar</Button>
                </div>

              </div>
            </form>
          </ Card>
        </div>
      </ModalBody>
    </Modal>
  )
}
export default FormEditUser