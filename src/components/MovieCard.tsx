import { Fragment } from "react";
import { useHistory } from 'react-router-dom';
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { Button, Card, CardContent, CardHeader, IconButton } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import ModalDel from "./ModalDel";
import { MovieCardPropType } from "../types/Movie";

const MovieCard = ({ movie, handleDelete, toggleIsFavorite }: MovieCardPropType) => {
  const history = useHistory();

  return (
    <Card elevation={3}>
      <CardHeader
        action={
          <Fragment>
            <ModalDel handleDelete={handleDelete} movie={movie} />
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
