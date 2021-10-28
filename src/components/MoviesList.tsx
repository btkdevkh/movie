import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import MovieCard from "./MovieCard";

// TypeScript
type movieType = {
  isFavorite: boolean,
}

const MoviesList = ({ favorite = false }) => {
  const [movies, setMovies] = useState<any[]>([]);

  // Get movies
  useEffect(() => {    
    fetch("http://127.0.0.1:8000/api/movie/")
      .then(res => res.json())
      .then(data => {
        if(favorite === true) {
          setMovies(data.filter((movie: movieType) => movie.isFavorite === favorite));
        } else {
          setMovies(data)
        }
      })
      .catch(err => console.log(err))    
  }, [favorite])

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

    const newMovies = movies.filter(movie => movie.id !== id);
    setMovies(newMovies);
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

    setMovies(movies.map(movie => movie.id === id ? { ...movie, isFavorite: !movie.isFavorite } : movie));
  }

  return (
    <Grid container spacing={1}>
      {movies.length > 0 && movies.map(movie => (
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
