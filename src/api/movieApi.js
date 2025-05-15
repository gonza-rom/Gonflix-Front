import api from "./authApi";


export const obtenerPeliculas =  (page) =>  api.get(`/movies/?page=${page}`)
export const obtenerPelicula =  (id) =>  api.get(`/movies/id/${id}`)
export const obtenerGeneros =  () =>  api.get(`/movies/genres/`)
export const obtenerIdiomas =  () =>  api.get(`/movies/languages/`)
export const crearPelicula =  (data) =>  api.post(`/movies/crear/`, data)
export const editarPelicula =  (id, data) =>  api.put(`/movies/actualizar/${id}`, data)
export const obtenerPorTmdb =  (id) =>  api.get(`/movies/tmdb/${id}`)
export const obtenerTopPeliculas =  (category) =>  api.get(`/movies/top/${category}`)

