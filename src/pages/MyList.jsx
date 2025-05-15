import React, { useEffect, useState } from 'react';
import { Pagination } from "flowbite-react";
import { useProfile } from '../contexts/ProfileContext';
import MovieCard from '../components/MovieCard';


const MyList = () => {

  const { currentProfile, watchlist } = useProfile()
  const [milista, setMilista] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const onPageChange = (page) => setCurrentPage(page);


  useEffect(() => {
    setMilista(watchlist[currentProfile._id])

  }
    , [watchlist[currentProfile._id]])


  return (
    <>
      <div className="flex flex-content items-center dark:bg-gray-900 dark:text-gray-100">
        <div className="flex flex-col justify-center items-center w-full h-full">
          <h1 className="text-4xl font-bold  my-3">Mi Lista </h1>
          <div className="flex flex-content flex-wrap  justify-center gap-3 p-3">
            {milista && milista.map((movie, index) => (
              <MovieCard key={index} index={index} _id={movie._id} title={movie.title} poster_path={movie.poster_path} />
            ))}
          </div>
        </div>
      </div>
      <div className="flex overflow-x-auto sm:justify-center">
        <Pagination currentPage={currentPage} totalPages={100} onPageChange={onPageChange} />
      </div>
    </>
  )
}
export default MyList