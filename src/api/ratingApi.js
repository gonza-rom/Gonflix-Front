import axios from "axios";
const api = axios.create({
  baseURL: `http://www.omdbapi.com/`
})

export const traeRating = (imdb) => api.get(`?apikey=dbb5dbf7&i=${imdb}`)
// export const traeRating = (imdb) => api.get(`?apikey=${import.meta.env.VITE_OMDB_APIKEY}&i=${imdb}`)

