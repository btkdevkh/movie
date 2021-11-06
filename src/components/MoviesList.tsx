import { Grid, Typography } from "@mui/material";
import MovieCard from "./MovieCard";
import { getMovies, getMovie, deleteMovie, updateMovie } from "../api/Movies";
import { useCallback, useEffect, useState } from "react";
import { Movie } from "../types/Movie";

const MoviesList = ({ favorite = false }) => {
  const [movies, setMovies] = useState<Movie[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  // Get movies with useCallback
  const handleGetMovies = useCallback(async () => {
    setLoading(true);

    const datas = await getMovies();

    if(datas) {
      if(favorite === true) {
        setMovies(datas.filter((movie: Movie) => movie.isFavorite === favorite));
      } else {
        setMovies(datas);
      }
      
      setLoading(false);
    } else {
      setMsg('Service indisponible, réessayez plus tard SVP !');
      setLoading(false);
    }

    setLoading(false);
  }, [favorite]);

  // Toggle isFavorite
  const toggleIsFavorite = async(id: number) => {
    // get movie by its id for toggling
    const movieToggle = await getMovie(id);
    
    const updateIsFavoriteMovie = { 
      ...movieToggle, 
      releaseDate: movieToggle.releaseDate.split('-').reverse().join('/'), 
      isFavorite: !movieToggle.isFavorite 
    };

    // need to be destructured with Symfony
    const { title, director, releaseDate, isFavorite } = updateIsFavoriteMovie;
    const movieToUpdate = { title, director, releaseDate, isFavorite };
    
    // update movie toggled
    const movieUpdated = await updateMovie(movieToUpdate, id);
    movieUpdated ? 
    handleGetMovies() : 
    setMsg('Service indisponible, réessayez plus tard SVP !');
  };

  // Delete movie
  const handleDelete = async (id: number) => {
    const movieDeleted = await deleteMovie(id);
    movieDeleted ? 
    handleGetMovies() : 
    setMsg('Service indisponible, réessayez plus tard SVP !');
  };

  // Component mounted
  useEffect(() => {
    if(!movies) {
      handleGetMovies();
    }

    return () => {
      setLoading(false);
    }
  }, [movies, handleGetMovies])

  return (
    <Grid container spacing={1}>
      {loading && <Typography mx='auto' variant="h5">Chargement...</Typography>}
      {msg && <Typography mx='auto' variant="h5">{msg}</Typography>}
      {movies && movies.map((movie: Movie) => (
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
