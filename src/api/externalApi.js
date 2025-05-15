import axios from "axios";

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYjg0YmY1ZjM5ZGUwZGU0ODI4MzlhMTUzNmY4M2NiMSIsIm5iZiI6MTc0MDcwODc3Mi42OTEsInN1YiI6IjY3YzExYmE0YjZjN2UzNDI1Y2EyNjYxZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yImwSi8dt6-ZYgcs2tpv76fKw68zenu7uHj2cPUczWM'
  }
};

export const traeIMDb = (id) => axios.get(`https://api.themoviedb.org/3/movie/${id}/external_ids`, options)

