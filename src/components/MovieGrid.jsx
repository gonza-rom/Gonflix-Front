import React, { useEffect } from 'react';
import MovieTopCard from './MovieTopCard';


const MovieGrid = ({ movies, title  }) => {
    return (
      <div className="container mx-auto px-4 py-8">
        {/* Título destacado */}
        <div className="flex items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            {title}
          </h2>
          {/* Opcional: línea decorativa */}
          <div className="ml-4 flex-grow h-px bg-gray-300 dark:bg-gray-600"></div>
        </div>
  
        {/* Grid de películas */}
        <div className="flex flex-wrap -mx-2">
          {movies.map((movie) => (
            <MovieTopCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    );
  };
export default MovieGrid;