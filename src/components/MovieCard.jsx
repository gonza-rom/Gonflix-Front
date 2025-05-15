import React from 'react'
import { useState } from 'react'
import { useProfile } from '../contexts/ProfileContext'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const MovieCard = ({ index ,_id, title,  poster_path }) => {
   
    
     const navigate = useNavigate()
       
      const { toggleWatchlist, isInWatchlist, currentProfile } = useProfile()  
    
      const handleClick = (id) => {
            navigate(`/movies/${id}`)
        }
    
        //agrega o quita de la lista de favoritos
        const addToWatchlist = () => {
           toast.info(isInWatchlist(_id) ? "se quitó de Mi Lista":"se agregó de Mi Lista...")
            toggleWatchlist({_id, title, poster_path}, currentProfile._id)
              
    
        }

    return (
        <>
       < div key={index} className="flex flex-col relative justify-between shadow-red-50 rounded-lg bg-gray-300 m-3 basis-64 cursor-pointer" onClick={() => handleClick(_id)}>
        
        <img src={`https://image.tmdb.org/t/p/original/${poster_path}`} alt={`${title}-poster`} className='rounded-sm' />


        <div className='absolute p-2 top-2 right-2 text-red-600 font-bold z-10' onClick={(e) => { e.stopPropagation(); addToWatchlist() }} >
            <i className={` text-xl bi ${isInWatchlist(_id) ? 'bi-heart-fill text-red-700' : 'bi-heart'} z-10`} ></i>
        </div>
    </div>
    </>
    )
}

export default MovieCard
