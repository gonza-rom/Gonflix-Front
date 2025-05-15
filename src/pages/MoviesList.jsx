import React, { useEffect } from 'react';
import { Pagination } from "flowbite-react";
import { useNavigate, useParams } from 'react-router-dom';
import { useMovies } from '../contexts/MovieContext';
import MovieCard from '../components/MovieCard';

const MoviesList = () => {
  const navigate = useNavigate()
  const { page } = useParams()
  const { getMovies, movies, pagination } = useMovies()

  const onPageChange = (page) => {

    try {
      navigate(`/movies/page/${page}`)
    }
    catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {

    getMovies(page)
  }
    , [page])



  return (
    <>
      <div className="flex flex-content items-center dark:bg-gray-900 dark:text-gray-100  ">
        <div className="flex flex-col justify-center items-center w-full h-full">
          <h1 className="text-4xl font-bold  my-3">Películas</h1>

          <div className="flex flex-content flex-wrap  justify-center gap-3 p-3">
            {movies && movies.map((movie, index) => (
              <MovieCard key={index} index={index} _id={movie._id} title={movie.title} poster_path={movie.poster_path} />
            ))}
          </div>
        </div>

      </div>
      <div className="flex overflow-x-auto sm:justify-center">
        <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} onPageChange={onPageChange} />      
      </div>

    </>
  )
}
export default MoviesList