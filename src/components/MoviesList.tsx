import { Grid, Typography } from "@mui/material";
import MovieCard from "./MovieCard";
import { useFetch } from "../hooks/useFetch";

// TypeScript
type movieType = {
  id: number,
  isFavorite: boolean,
}

const MoviesList = ({ favorite = false }) => {
  // Get movies depends on pages condition(favorite or not)
  const { datas: movies, loading, error } = useFetch("http://127.0.0.1:8000/api/movie/", favorite);

  // Get movie
  const fetchMovie = async(id: number) => {
    const res = await fetch("http://127.0.0.1:8000/api/movie/"+id);
    const data = await res.json();
    return data;
  }

  // Delete movie
  const handleDelete = async(id: number) => {
    await fetch("http://127.0.0.1:8000/api/movie/"+id, {
      method: "DELETE"
    })
  }

  // Toggle isFavorite
  const toggleIsFavorite = async(id: number) => {
    const movieToggle = await fetchMovie(id);
    
    const updateIsFavoriteMovie = { 
      ...movieToggle, 
      releaseDate: movieToggle.releaseDate.split('-').reverse().join('/'), 
      isFavorite: !movieToggle.isFavorite 
    };

    // Need to be destructured with Symfony
    const { title, director, releaseDate, isFavorite } = updateIsFavoriteMovie;
    
    await fetch("http://127.0.0.1:8000/api/movie/"+id, {
      method: "PUT",
      headers: {
        "Content-Type":  "application/json"
      },
      body: JSON.stringify({ title, director, releaseDate, isFavorite })
    })

    return movies?.map((movie: movieType) => movie.id === id ? { ...movie, isFavorite: !movie.isFavorite } : movie);
  }

  return (
    <Grid container spacing={1}>
      {loading && <Typography mx='auto' variant="h5">Chargement...</Typography>}
      {error && <Typography mx='auto' variant="h5">{error}</Typography>}
      {movies && movies.map((movie: any) => (
        <Grid item key={movie.id} xs={12} sm={12} md={6} lg={4} mx="auto">
          <MovieCard 
            movie={movie} 
            handleDelete={handleDelete}
            toggleIsFavorite={toggleIsFavorite}
          />
        </Grid>
      ))}
    </Grid>
  )
}

export default MoviesList;
