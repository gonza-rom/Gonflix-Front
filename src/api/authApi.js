import axios from "axios";
const api = axios.create({
  // baseURL: import.meta.env.VITE_BASE_URL
   baseURL: 'https://modulo4-sprint6-back-1.onrender.com/'
})

export const createUsuario = (user) => api.post('/auth/register', user)
export const validarMailToken = (token) => api.get('/auth/verify/token/' + token)
export const login = (credentials) => api.post('/auth/login/', credentials)
export const olvidoPass = (email) => api.post('/auth/forgotpassword/', email)
export const resetPass = (id, password) => api.post('/auth/resetpassword', { id, password })
export const cambiarPassword = (id, currentpassword, newpassword) => api.post('/auth/changepassword', { id, currentpassword, newpassword })
export const borrarUsuario = (id) => api.delete('/auth/delete/' + id)
export const obtenerUsuarios = () => api.get('/auth/users')
export const obtenerRoles = () => api.get('/auth/roles')
export const editarUsuario = (id, data) => api.put(`/auth/actualizar/${id}`, data)

export default api