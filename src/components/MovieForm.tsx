import { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { 
  Typography, 
  Button, 
  TextField, 
  FormLabel, 
  FormControl ,
  Alert,
  AlertTitle,
  Stack,
  Checkbox
} from "@mui/material";
import { KeyboardArrowRight } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import { useHistory } from "react-router-dom";
import { Movie } from '../types/Movie';
import { createMovie, getMovie, updateMovie } from '../api/Movies';

// CSS custom styles
const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: 'block !important',
  },
  title: {
    padding: 10,
    background: '#71a0c8',
    borderRadius: 5
  },
  form: {
    maxWidth: 500,
    margin: 'auto'
  }
});

const MovieForm = ({ mode = "add", id = "" }) => {  
  const classes = useStyles();
  const history = useHistory();  

  const [movies, setMovies] = useState<Movie>({
    title: '',
    director: '',
    releaseDate: '',
    isFavorite: false
  });

  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {       
    setMovies({
      ...movies,
      isFavorite: e.target.checked,
      [e.target.name]: (e.target as HTMLInputElement).value
    })    
  }

  // destructure from movies state
  const { title, director, releaseDate, isFavorite } = movies;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(!title || !director || !releaseDate) {
      setMsg('Champs Obligatoires *');
    } else {
      // Formated date
      const releaseDateFormated = releaseDate.split('-').reverse().join('/');  
      
      // Construct movie object
      const movie = { 
        title, 
        director, 
        releaseDate: releaseDateFormated, 
        isFavorite
      };

      if(id) {
        // Update
        const movieUpdated = await updateMovie(movie, Number(id));
        if(movieUpdated !== null) history.push('/movies');
      } else {
        // Create
        const movieCreated = await createMovie(movie);
        if(movieCreated !== null) history.push('/movies');
      }
    }
  }

  // Component mounted
  useEffect(() => {
    mode === "add" ? setLoading(false) : setLoading(true);

    if(id) {
      // Get movie
      getMovie(+id)
      .then(data => {
        if(data) {
          setMovies({
            ...movies,
            title: data.title,
            director: data.director,
            releaseDate: data.releaseDate,
            isFavorite: data.isFavorite
          })
          
          setLoading(false);
        } else {
          setMsg('Service indisponible, réessayez plus tard SVP !');
        }
      }).catch(err => setMsg(err.message));
    }

    // Clean up
    return () => {
      setLoading(false);
    }

    // eslint-disable-next-line
  }, [id])

  return (
    <div className={classes.form}>
      {loading && <Typography my={2} align="center" variant="h5">Chargement...</Typography>}
      <Typography
        variant="h6"
        component="h2"
        align="center"
        gutterBottom
        color="textSecondary"
        className={classes.title}
        style={{ marginBottom: '15px', color: '#fff' }}
      >
        {mode === "add" ? "Ajouter un film" : "Modifier un film"}
      </Typography>

      <form 
        noValidate 
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <TextField
          label="Titre"
          variant="outlined"
          color="secondary"
          fullWidth
          required
          name="title"
          value={title}
          error={msg ? true : false}
          onChange={handleChange}
          style={{ marginBottom: '20px' }}
        />
        <TextField
          label="Directeur/Directrice"
          variant="outlined"
          color="secondary"
          fullWidth
          required
          name="director"
          value={director}
          error={msg ? true : false}
          onChange={handleChange}
          style={{ marginBottom: '20px' }}
        />
        <TextField
          type="date"
          label="Date de sortie"
          variant="outlined"
          color="secondary"
          fullWidth
          required
          name="releaseDate"
          value={releaseDate}
          error={msg ? true : false}
          onChange={handleChange}
          style={{ marginBottom: '20px' }}
          InputLabelProps={{
            shrink: true,
          }}
        />

        <FormControl 
          className={classes.field} 
          style={{ marginBottom: '20px' }}
        >
          <FormLabel>Film Favorie ?</FormLabel>
          <Checkbox 
            checked={isFavorite}
            onChange={handleChange} 
          />
        </FormControl>
        
        <Button
          type='submit'
          color="primary"
          variant="contained"
          style={{ padding: 15 }}
          endIcon={<KeyboardArrowRight />}
        >
          {mode === "add" ? "Ajouter" : "Modifier"}
        </Button>
      </form>
      {
        msg ? (
          <Stack sx={{ width: '100%' }} spacing={2} my={2}>
            <Alert severity="error">
              <AlertTitle><strong>{msg}</strong></AlertTitle>
            </Alert>
          </Stack>
        ) : null
      }
    </div>
  )
}

export default MovieForm;
