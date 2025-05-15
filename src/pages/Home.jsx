import { useEffect, useState } from "react"
import { useAuth } from "../contexts/AuthContext"
import { useMovies } from "../contexts/MovieContext"
import { useProfile } from "../contexts/ProfileContext"
import MovieGrid from "../components/MovieGrid"

const Home = () => {
const [topPopularity, setTopPopularity] = useState([])
const [topDateRelease, setTopDateRelease] = useState([])
const [topVoteAverage, setTopVoteAverage] = useState([])

  const {getTopMovies} =useMovies()
   
  useEffect(() => {
     
     const getMovies =async() => {
      setTopPopularity(await getTopMovies('popularity'))
      setTopDateRelease (await getTopMovies('date_release'))
      setTopVoteAverage(await getTopMovies('vote_average'))
     
    }

    getMovies()
  }, [])
  
  return (
<>
  <MovieGrid movies={topDateRelease} title="Últimos Estrenos" />

  <MovieGrid movies={topPopularity} title="Más Populares"/>

  <MovieGrid movies={topVoteAverage} title="Mayor Promedio de Votos" />

  
</>      
  )
}

export default Home