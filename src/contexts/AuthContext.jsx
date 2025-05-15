import { createContext, useContext, useEffect, useState } from 'react'
import api, { borrarUsuario, cambiarPassword, createUsuario, editarUsuario, login, obtenerRoles, obtenerUsuarios, olvidoPass, resetPass, validarMailToken } from '../api/authApi'

import { jwtDecode } from 'jwt-decode'
import { useProfile } from './ProfileContext'

export const AuthContext = createContext()


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const { setCurrentProfile } = useProfile()


  const getUsers = async () => {
    const { data, error } = await obtenerUsuarios()
    if (error) {
      console.log('error=>', error)
    } else {
      return (data)
    }
  }

  //crea una cuenta de usuario
  const createUser = async (user) => {
    const { data } = await createUsuario(user)
  }

  //valida el token de alta de cuenta enviado por amil
  const validarToken = async (token) => {
    const { data } = await validarMailToken(token)

  }

  /// envia un mail con un token
  const olvidoPassword = async (email) => {
    console.log(email)
    const { data } = await olvidoPass(email)
    console.log('error en olvido=>', data.message)
  }

  ///envia la nueva contraseña
  const resetPassword = async (id, password) => {
    const { data } = await resetPass(id, password)
    console.log('error en reset=>', data.message)
  }


  ///cambia la  contraseña
  const changePassword = async (currentPassword, newPassword) => {
    const { data } = await cambiarPassword(user.id, currentPassword, newPassword)
    console.log('error en reset=>', data.message)
  }

  // elimina una cuenta de usuario
  const deleteUser = async (id = user.id) => {
    const { data } = await borrarUsuario(id)
    logoutUser()
  }

  // login - acceso al sistema
  const loginUser = async (credentials) => {

    // try {
      const { data } = await login(credentials)
      // si las credenciales son validas almacena los datos n local storage y estabelece el token en el header 
      const decoded = jwtDecode(data.token)
      setUser(decoded)
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(decoded))
      api.defaults.headers.common["authorization"] = `Bearer ${data.token}`
    // } catch (error) {
    //   console.log(error)
    // }
  }

  //cierra la sesion del usuario
  const logoutUser = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('currentProfile')
    setUser(null)
    setCurrentProfile(null)
  }

  //obtien el total de roles de usuario
  const getRoles = async () => {
    const { data } = await obtenerRoles()
    console.log('error=>', data.error)
    return (data)
  }

  //envia el formualrio de aactualizacion de detos del usuario
  const editUser = async (id, userData) => {
    const { data } = await editarUsuario(id, userData)
  }



  useEffect(() => { // carga los datos de usuario y token desde el localstorage
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    if (token && savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        setUser(parsed);
        // establece el header para autorizacion en backend
        api.defaults.headers.common['authorization'] = `Bearer ${token}`;

      } catch (err) {
        console.error('Error parsing saved user:', err);
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, createUser, validarToken, loginUser, logoutUser, olvidoPassword, resetPassword, deleteUser, changePassword, getUsers, getRoles, editUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)



