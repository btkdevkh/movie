import { Movie } from "../types/Movie";

// URL API
let URL_API = "http://127.0.0.1:8000/api/movie/";

// Get movies
export const getMovies = async() => {
  try {
    const res = await fetch(URL_API);
    if(!res.ok) throw new Error(res.statusText);
    return await res.json();
  } catch (err: any) {
    console.log(err.message);
  }
}

// Get movie
export const getMovie = async(id: number) => {
  try {
    const res = await fetch(URL_API+id);
    if(!res.ok) throw new Error(res.statusText);
    return await res.json();
  } catch (err: any) {
    console.log(err.message);
  }
}

// Create movie
export const createMovie = async(movie: Movie) => {
  try {
    const res = await fetch(URL_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(movie)
    })
    if(!res.ok) throw new Error(res.statusText);
    return await res.json();
  } catch (err: any) {
    console.log(err.message);
  }
}

// Update movie
export const updateMovie = async (movie: Movie, id: number) => {
  try {
    return await fetch(URL_API+id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(movie)
    })
  } catch (err: any) {
    console.log(err.message);
  }
}

// Delete movie
export const deleteMovie = async (id: number) => {
  try {
    return await fetch(URL_API+id, {
      method: "DELETE"
    })
  } catch (err: any) {
    console.log(err.message);
  }
}
