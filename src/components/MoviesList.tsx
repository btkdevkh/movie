import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import MovieCard from "./MovieCard";

const MoviesList = () => {
  const [movies, setMovies] = useState<any[]>([]);

  // Get movies
  useEffect(() => {    
    fetch("http://127.0.0.1:8000/api/movie/")
      .then(res => res.json())
      .then(data => setMovies(data))
      .catch(err => console.log(err))      
  }, [])

  // Delete movie
  const handleDelete = async(id: number) => {
    await fetch("http://127.0.0.1:8000/api/movie/"+id, {
      method: "DELETE"
    })

    const newMovies = movies.filter(movie => movie.id !== id);
    setMovies(newMovies);
  }

  return (
    <Grid container spacing={1}>
      {movies.length && movies.map(movie => (
        <Grid item key={movie.id} xs={12} sm={6} md={3} lg={4}>
          <MovieCard movie={movie} handleDelete={handleDelete} />
        </Grid>
      ))}
    </Grid>
  )
}

export default MoviesList;
