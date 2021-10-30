import MovieForm from "../components/MovieForm";
import { useParams } from "react-router-dom";

const Update = () => {
  const { id } = useParams<{ id: string }>(); 
  return <MovieForm mode="edit" id={id} />
}

export default Update;
