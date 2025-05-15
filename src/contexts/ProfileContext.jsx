import { createContext, useContext, useEffect, useState } from 'react'
import api from '../api/authApi'
import { borrarPerfil, crearPerfil, editarPerfil, obtenerPerfiles } from '../api/profileApi'

export const ProfileContext = createContext()


export const ProfileProvider = ({ children }) => {
  const [profiles, setProfiles] = useState([])
  const [currentProfile, setCurrentProfile] = useState(null)
  const [profileInEdition, setProfileInEdition] = useState(null)
  const [watchlist, setWatchlist] = useState({})


  //crea un nuevo perfil
  const createProfile = async (profileData) => {
    const { data } = await crearPerfil(profileData)
    console.log('error=>', data.message)
  }

  //actualiza datos de un perfil
  const editProfile = async (id, profileData) => {
    const { data } = await editarPerfil(id, profileData)
    console.log('error=>', data.message)
    getProfiles(data.user)
  }

  //trae todos los perfiles de un usuario
  const getProfiles = async (userId) => {
    const { data } = await obtenerPerfiles(userId)
    setProfiles(data)
  }

  //elimina un perfil
  const deleteProfile = async (id) => {
    const { data } = await borrarPerfil(id)
    setProfiles(profiles.filter(item => item._id !== id))
  }


  //agrega o quita una pelicula de la lista de favoritos
  const toggleWatchlist = async (nuevoItem, profileId) => {

    setWatchlist(prev => {
      const arrayActual = prev[profileId] || [];

      // Verificar si ya existe un objeto con el mismo id
      const indice = arrayActual.findIndex(item => item._id === nuevoItem._id);

      const nuevoArray = indice !== -1
        ? arrayActual.filter(item => item._id !== nuevoItem._id)  // Eliminar

        : [...arrayActual, nuevoItem] // Agregar
      localStorage.setItem("watchlist", JSON.stringify({ ...prev, [profileId]: nuevoArray }))
      return { ...prev, [profileId]: nuevoArray };
    },

    );

  }

  // verifica si una pelicula ya se encuentra en la lsita de favoritos
  const isInWatchlist = (id) => {

    try {
      if (watchlist[currentProfile?._id]) {
        return watchlist[currentProfile._id].some(item => item._id === id);
      }
      else {
        return false
      }
    } catch (error) {
    }
  }

  //carga la watchlist del localstorage
  useEffect(() => {
    const savedWatchlist = JSON.parse(localStorage.getItem("watchlist")) || []
    setWatchlist(savedWatchlist)

  }, [])


  //carga el perfil desde localstorage
  useEffect(() => {
    try {
      const profile = localStorage.getItem('currentProfile');
      const parsed = JSON.parse(profile);
      setCurrentProfile(parsed);

    } catch (err) {
      console.error('Se produjo un error:', err);
    }

  }, [])

  //estable una varible en el header indicando si el perfil actual es menor de edad
  useEffect(() => {
    if (currentProfile) api.defaults.headers.common['X-Adult'] = (currentProfile.age > 18)
  }, [currentProfile])

  return (
    <ProfileContext.Provider value={{ profiles, currentProfile, setCurrentProfile, setProfiles, createProfile, getProfiles, deleteProfile, editProfile, profileInEdition, setProfileInEdition, watchlist, setWatchlist, isInWatchlist, toggleWatchlist }}>
      {children}
    </ProfileContext.Provider>
  )
}

export const useProfile = () => useContext(ProfileContext)



