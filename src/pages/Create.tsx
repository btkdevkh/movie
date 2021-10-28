import { useState } from "react";
import { 
  Typography, 
  Button, 
  TextField, 
  Radio, 
  RadioGroup, 
  FormControlLabel, 
  FormLabel, 
  FormControl 
} from "@mui/material";
import { KeyboardArrowRight } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import { useHistory } from "react-router";

// CSS custom styles
const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: 'block !important',
  },
  title: {
    padding: 10,
    background: 'teal',
    borderRadius: 5,
    color: '#fff !important'
  },
  form: {
    maxWidth: 500,
    margin: 'auto'
  }
})

const Create = () => {
  const classes = useStyles();

  // Fileds states
  const [title, setTitle] = useState<string>('');
  const [director, setDirector] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  const [titleError, setTitleError] = useState<boolean>(false);
  const [directorError, setDirectorError] = useState<boolean>(false);
  const [dateError, setDateError] = useState<boolean>(false); 

  const history = useHistory();

  // Create movie
  const handleSubmit = (e: any) => {
    e.preventDefault();

    setTitleError(false)
    setDirectorError(false);
    setDateError(false);

    // If filed is empty
    if(title === '') setTitleError(true);
    if(director === '') setDirectorError(true);
    if(date === '') setDateError(true);

    if(title && director && (!isFavorite || isFavorite)) {
      // Formated date
      const [y, m, d] = date.split('-');
      const releaseDate = [d, m, y].join('/');
      
      fetch("http://127.0.0.1:8000/api/movie/", {
        method: "POST",
        headers: {
          "Content-Type":  "application/json"
        },
        body: JSON.stringify({ title, director, releaseDate, isFavorite })
      })
      .then(() => history.push("/"))
      .catch(err => console.log(err));

      setTitle('');
      setDirector('');
      setDate('');
      setIsFavorite(false);
    } 
  }

  return (
    <div className={classes.form}>
      <Typography
        variant="h6"
        component="h2"
        align="center"
        gutterBottom
        color="textSecondary"
        className={classes.title}
      >
        Ajouter un film
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
          style={{ marginBottom: '20px' }}
          error={titleError}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          label="Directeur/Directrice"
          variant="outlined"
          color="secondary"
          fullWidth
          required
          style={{ marginBottom: '20px' }}
          error={directorError}
          value={director}
          onChange={(e) => setDirector(e.target.value)}
        />
        <TextField
          type="date"
          label="Date de sortie"
          variant="outlined"
          color="secondary"
          fullWidth
          required
          style={{ marginBottom: '20px' }}
          InputLabelProps={{
            shrink: true,
          }}
          error={dateError}
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <FormControl 
          className={classes.field} 
          style={{ marginBottom: '20px' }}
        >
          <FormLabel>Film Favorie ?</FormLabel>
          <RadioGroup
            value={isFavorite} 
            onChange={() => setIsFavorite(o => !o)}
          >
            <FormControlLabel 
              value={true}
              control={<Radio />} 
              label="Oui"
            />
            <FormControlLabel 
              value={false}
              control={<Radio />}
              label="Non"
            />
          </RadioGroup>
        </FormControl>
        
        <Button
          type='submit'
          color="primary"
          variant="contained"
          style={{ padding: 15 }}
          endIcon={<KeyboardArrowRight />}
        >
          Ajouter
        </Button>
      </form>
    </div>
  )
}

export default Create;
