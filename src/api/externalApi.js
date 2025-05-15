import axios from "axios";

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMzE1NWJkNmMyMWU2MmRkMzIzZjJkYjFhOTIyNDRiMCIsIm5iZiI6MS43NDczNDE3NzYyOTQwMDAxZSs5LCJzdWIiOiI2ODI2NTFkMDc2MmI4ODVhZTg3NjdmNjMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.U6qFQP22jZ-8ne5RT91DsXFZprmBY_tpKtOZ7nisIfw'
  }
};

export const traeIMDb = (id) => axios.get(`https://api.themoviedb.org/3/movie/${id}/external_ids`, options)

