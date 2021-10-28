import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, Grid, Typography } from "@mui/material";

// TypeScript
type movieType = {
  title: string,
  director: string,
  releaseDate: string
}

const Details = () => {
  const [movie, setMovie] = useState<movieType>();
  const { id } = useParams<{ id: string }>(); 

  useEffect(() => {
    // Get movie
    fetch("http://127.0.0.1:8000/api/movie/"+id)
    .then(res => res.json())
    .then(data => setMovie(data))
    .catch(err => console.log(err));
  }, [id])

  return (
    <Grid item xs={12} lg={6} mx="auto">
      {movie && (
        <Card elevation={3}>
          <CardHeader
            title={movie.title}
            subheader={`Directeur/trice: ${movie.director}`}
          />
          <CardContent>
            <Typography>
              Année de sortie: {movie.releaseDate.split('-').reverse().join('/')}
            </Typography>
          </CardContent>
        </Card>
      )}
    </Grid>
  )
}

export default Details;
