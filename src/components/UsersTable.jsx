import { Button, ButtonGroup, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { toast } from "react-toastify";
import Swal from 'sweetalert2';
import { useAuth } from '../contexts/AuthContext';
import FormEditUser from './FormEditUser';


const UsersTable = () => {
  const [users, setUsers] = useState([])
  const [userToEdit, setUserToEdit] = useState({})
  const { getUsers, deleteUser } = useAuth()

  const [openModal, setOpenModal] = useState(false);


  const handleDelete = (id) => {
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
            deleteUser(id),
            {
              pending: 'Eliminando cuenta...',
              success: 'Cuenta eliminada con éxito! 🎉',
              error: 'Error al eliminar la cuenta '
            }
          );
          //vuelve al home
          onClose()


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


  const onCloseModal = () => {
    getAllUsers()
    setOpenModal(false);

  }

  const openEdit = (_id, email, role, isVerified) => {
    setUserToEdit({ _id, email, role, isVerified })
    setOpenModal(true)

  }

  const getAllUsers = async () => {
    const users = await getUsers()
    setUsers(users)
  }

  useEffect(() => {
    getAllUsers()
  }
    , [])

  return (
    <>
      <FormEditUser data={userToEdit} openModal={openModal} onCloseModal={onCloseModal} />
      <div className="overflow-x-auto">
        <Table hoverable>
          <TableHead >
            <TableRow className='text-gray-200'>
              <TableHeadCell className='bg-red-600 dark:bg-gray-900'>email</TableHeadCell>
              <TableHeadCell className='bg-red-600 dark:bg-gray-900'>Role</TableHeadCell>
              <TableHeadCell className='bg-red-600 dark:bg-gray-900'>Cuenta verificada</TableHeadCell>

              <TableHeadCell className='bg-red-600 dark:bg-gray-900'>
                <span className="sr-only">Edit</span>
              </TableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody className="divide-y">
            {
              users.map((user, index) => (
                <TableRow key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">

                  <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{user.email}</TableCell>
                  <TableCell> {user.role?.name.toString()}</TableCell>
                  <TableCell className='text-center'>{user.isVerified && <i className="bi bi-check2-square" />}</TableCell>
                  <TableCell>
                    <ButtonGroup>
                      <Button color="alternative" size="xs" className='cursor-pointer' title='editar' onClick={() => openEdit(user._id, user.email, user.role?.name, user.isVerified)}>
                        <i className="bi bi-pen text-sm  p-0" />
                      </Button>
                      <Button color="alternative" size="xs" className='cursor-pointer' title='borrar' onClick={() => handleDelete(user._id)}>
                        <i className="bi bi-trash text-sm  p-0" />
                      </Button>
                    </ButtonGroup>
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </div>
    </>
  )
}

export default UsersTable

