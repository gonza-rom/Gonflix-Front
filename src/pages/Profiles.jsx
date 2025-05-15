import { Card } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
import { NewProfile } from '../components/NewProfile'
import { useAuth } from '../contexts/AuthContext'
import { useProfile } from '../contexts/ProfileContext'


const Profiles = () => {

  const [openModal, setOpenModal] = useState(false);
  const [idEdit, setIdEdit] = useState(null)
  const { getProfiles, profiles, setCurrentProfile, deleteProfile, setProfileInEdition } = useProfile()
  const { user } = useAuth()
  const userId = user.id
  const navigate = useNavigate()

  const handleClick = (e) => {
    const profileId = e.currentTarget.id
    const selected = profiles.find(item => item._id === profileId);
    setCurrentProfile(selected)

    localStorage.setItem('currentProfile', JSON.stringify(selected))
    navigate(`/home/`)

  }

  const handleDelete = (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás recuperar el perfil eliminado",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {           ////envia la ID para eliminar la carta
          await toast.promise(
            deleteProfile(id),
            {
              pending: 'Eliminando el perfil...',
              success: 'Perfil eliminado con éxito! 🎉',
              error: 'Error al eliminar el perfil! '
            }
          );
          //vuelve al listado de cartas
          // navigate(`/cards`)

        } catch (error) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo eliminar el perfil',
            footer: error.response.data.message,
            confirmButtonText: 'Aceptar'
          })
          console.error('Error deleting profile:', error)

        }
      }
    })
  }

  const handleEdit = (id) => {
    setProfileInEdition(profiles.find(item => item._id === id))
    setOpenModal(true)
  }

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        await getProfiles(userId)
      } catch (error) {
        console.error('Error al obtener los perfiles :', error)
      }
    }
    if (userId) {
      fetchProfiles(userId)
    }
  }, [userId])


  const toggleOpen = () => {
    setOpenModal(!openModal)
  }
  return (

    <div className=' flex flex-content justify-center  h-full dark:bg-gray-900 dark:text-gray-100' >

      <div className="flex flex-col justify-center items-center w-full h-full">
        <h1 className="text-4xl font-bold  my-3">¿Quién está viendo?</h1>
        <div className="flex flex-wrap justify-center gap-3 p-3 ">
          {
            profiles.map((profile) => (
              <Card key={profile._id} className='flex flex-content  mx-15  rounded-lg shadow dark:bg-gray-800 ' >
                <div onClick={handleClick} id={profile._id} className='cursor-pointer'>
                  <div className='text-center font-bold'>{profile.name}</div>
                  <img src={`/avatars/${profile.avatar}`} alt="Avatar" className='h-50' />
                </div>
                <div className='flex fflex-content  justify-center items-center'>
                  <div onClick={() => handleDelete(profile._id)} className='cursor-pointer'> <i className="bi bi-trash text-2xl text-red-500 px-2" ></i></div>
                  <div onClick={() => handleEdit(profile._id)} className='cursor-pointer'><i className="bi bi-pen text-2xl text-red-500 px-2" ></i></div>
                </div>
              </Card>
            ))
          }
          <Card className="flex flex-content items-center justify-center mx-10  rounded-lg shadow dark:bg-gray-800 cursor-pointer">
            <div className='text-center font-bold'>Agregar perfil</div>

            <div><button onClick={toggleOpen} className='cursor-pointer'>
              <img src={`/avatars/placeholder.png`} alt="Avatar" className='h-50' />

            </button>
              <NewProfile openModal={openModal} setOpenModal={setOpenModal} id={idEdit} />
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Profiles