import api from "./authApi";

export const crearPerfil =  (profile) =>  api.post('/profile/create', profile)
export const obtenerPerfiles =  (id) =>  api.get('/profile/userid/'+ id)
export const borrarPerfil =  (id) =>  api.delete('/profile/delete/'+ id)
export const editarPerfil =  (id, data) =>  api.post('/profile/update/'+ id, data)

