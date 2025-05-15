import React from 'react'
import { Card } from 'flowbite-react'

const MovieTopCard = ({ movie }) => {
  return (
    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-2">

      <Card
        className="h-full flex flex-col"
        imgSrc={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '/placeholder-movie.jpg'}
        horizontal={false}
      >
        <h5 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white line-clamp-1">
          {movie.title}
        </h5>
        <div className="flex justify-between items-center mt-2">
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">
            {movie.vote_average?.toFixed(1)}/10
          </span>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {movie.release_date?.split('-')[0]}
          </span>
        </div>
        <p className="font-normal text-gray-700 dark:text-gray-400 mt-2 text-sm line-clamp-2">
          {movie.overview}
        </p>
      </Card>

    </div>
  )
}

export default MovieTopCard