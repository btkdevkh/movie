import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, Grid, Typography } from "@mui/material";
import { getMovie } from "../api/Movies";
import { Movie } from "../types/Movie";

const Details = () => {
  const [movie, setMovie] = useState<Movie>();
  const [loading, setLoading] = useState<boolean>(false);
  const [msg, setMsg] = useState<string>('');
  const { id } = useParams<{ id: string }>(); 

  // Component monted
  useEffect(() => {
    setLoading(true);

    // Get movie details page
    getMovie(Number(id))
      .then(data => {
        if(data) {
          setMovie(data);
          setLoading(false);
        } else {
          setMsg('Service indisponible, réessayez plus tard SVP !');
        }
      }).catch(err => setMsg(err.message));
  }, [id])

  return (
    <Grid item xs={12} lg={6} mx="auto">
      {loading && <Typography textAlign="center" variant="h5">Chargement...</Typography>}
      {msg && <Typography textAlign="center" variant="h5">{msg}</Typography>}
      {movie && (
        <Card elevation={3}>
          <CardHeader
            title={movie.title}
            subheader={`Directeur/trice: ${movie.director}`}
          />
          <CardContent>
            <Typography>
              Année de sortie: {movie.releaseDate?.split('-').reverse().join('/')}
            </Typography>
          </CardContent>
        </Card>
      )}
    </Grid>
  )
}

export default Details;
