import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import { createContext, useContext, useState } from 'react'
import { traeIMDb } from '../api/externalApi'
import { crearPelicula, editarPelicula, obtenerGeneros, obtenerIdiomas, obtenerPelicula, obtenerPeliculas, obtenerPorTmdb, obtenerTopPeliculas } from '../api/movieApi'
import { traeRating } from '../api/ratingApi'

export const MovieContext = createContext()


export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([])
  const [pagination, setPagination] = useState({ currentPage: 1, totalPages: 1 })


  //envia los datos para crear una nueva pelicula
  const createMovie = async (movieData) => {
    const { data } = await crearPelicula(movieData)
  }

  //actualiza los datos de una pelicula
  const editMovie = async (id, movieData) => {
    const { data } = await editarPelicula(id, movieData)
  }
  //obtiene el listado de las peliculas, inidicando el numero de paginado
  const getMovies = async (page) => {
    const { data } = await obtenerPeliculas(page)
    setPagination(data.pagination)
    setMovies(data.data)
    console.log('error=>', data.error)
  }

  //obtiene las 5 primeras peliculas de una categoria dada
  const getTopMovies = async (category) => {
    const { data } = await obtenerTopPeliculas(category)
    return (data)
  }

  // regresa una pelicuda dado el id
  const getMovieById = async (id) => {
    const { data } = await obtenerPelicula(id)
    return (data)
  }

  //regresa una pelicula dado el id de The Movie DB
  const getMovieByTmdb = async (id) => {
    const { data } = await obtenerPorTmdb(id)
    return (data)
  }

  //obtiene el ranking de una pelicula indicando el codibo IMDb desde www.omdbapi.com
  const getRating = async (imdb) => {
    const { data } = await traeRating(imdb)
    return (data)
  }

  // obtiene el codigo IMDb dado el id de TMDb
  const getIMDb = async (id) => {
    const { data } = await traeIMDb(id)
    return (data)
  }

  // obtiene el listado de generos de las peliculas
  const getGenres = async () => {
    const { data } = await obtenerGeneros()
    return (data)
  }

  //obtiene el listado de idiomas de las peliculas
  const getLanguages = async () => {
    const { data } = await obtenerIdiomas()
    return (data)
  }

  return (
    <MovieContext.Provider value={{ movies, setMovies, getMovies, getGenres, getLanguages, getMovieById, createMovie, editMovie, getMovieByTmdb, getTopMovies, getRating, getIMDb, pagination }}>
      {children}
    </MovieContext.Provider>
  )
}

export const useMovies = () => useContext(MovieContext)



