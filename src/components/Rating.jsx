import { useState, useEffect } from "react";
import { Rating, RatingStar } from "flowbite-react";


const MovieRating = ({ value, max = 100, size = "md" }) => {
  const [ratingValue, setRatingValue] = useState(0)
  // Convertir el valor de 0-100 a un rango de 0-5 estrellas (que es lo que usa Flowbite)
  const [starsValue, setStarsValue] = useState(0)

  
  useEffect(() => {
    setRatingValue(value)
    setStarsValue(Math.round((value / max) * 5))
  }, [value])

  return (
    <>
      {
        (ratingValue > 0) &&
        <div className="inline-flex items-center">
          <Rating size={size}>
            {/* Mostrar 5 estrellas, rellenas según el valor calculado */}
            {[...Array(5)].map((_, i) => (
              <RatingStar key={i} filled={i < starsValue} />
            ))}
          </Rating>
          <span className="ml-2 text-sm font-medium text-gray-500">
        {value}%
      </span>
        </div>
      }
    </>
  );
};


export default MovieRating