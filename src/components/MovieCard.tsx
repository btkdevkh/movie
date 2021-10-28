import { Fragment } from "react";
import { useHistory } from 'react-router-dom';
import { DeleteOutline, Favorite, FavoriteBorder } from "@mui/icons-material";
import { Button, Card, CardContent, CardHeader, IconButton } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';

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

const MovieCard = ({ movie, handleDelete, toggleIsFavorite }: PropType) => {
  const history = useHistory();

  return (
    <Card elevation={3}>
      <CardHeader
        action={
          <Fragment>
            <IconButton
              onClick={() => handleDelete(movie.id)}
            >
              <DeleteOutline />
            </IconButton>
          </Fragment>
        }
        title={movie.title}
      />
      <CardContent>
        <IconButton
          onClick={() => toggleIsFavorite(movie.id)}
        >
          {movie.isFavorite ? <Favorite /> : <FavoriteBorder /> }
        </IconButton>
        <IconButton
          onClick={() => history.push(`/update/${movie.id}`)}
        >
          <EditIcon />
        </IconButton>
        <Button
          variant="contained"
          size="small"
          onClick={() => history.push(`/details/${movie.id}`)}
        >
          Details
        </Button>
      </CardContent>
    </Card>
  )
}

export default MovieCard;
