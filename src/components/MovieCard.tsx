import { Fragment } from "react";
import { DeleteOutline, Favorite, FavoriteBorder } from "@mui/icons-material";
import { Card, CardHeader, IconButton } from "@mui/material";
import { makeStyles } from "@mui/styles";

// TypeScript
type PropType = {
  movie: {
    id: number
    title: string,
    director: string,
    isFavorite: boolean,
  },
  handleDelete: Function,
  toggleIsFavorite: Function
}

// Somes styles
const useStyles = makeStyles({
  favorite: {
    border: (movie) => {
      if(movie === true) {
        return '3px solid pink'
      }
    }
  }
})

const MovieCard = ({ movie, handleDelete, toggleIsFavorite }: PropType) => {
  const classes = useStyles(movie.isFavorite);

  return (
    <Card 
      elevation={3}
      className={classes.favorite}
    >
      <CardHeader
        action={
          <Fragment>
            <IconButton
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                toggleIsFavorite(movie.id);
              }}
            >
              {movie.isFavorite ? <Favorite /> : <FavoriteBorder /> }
            </IconButton>
            <IconButton
              onClick={() => handleDelete(movie.id)}
            >
              <DeleteOutline />
            </IconButton>
          </Fragment>
        }
        title={movie.title}
      />
    </Card>
  )
}

export default MovieCard;
