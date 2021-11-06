export type Movie = {
  id?: number
  title: string,
  director: string,
  releaseDate?: string,
  isFavorite: boolean
}

export type LayoutProps =  { 
  children: React.ReactNode
}

export type MovieFunctionProps = {
  movie: Movie,
  handleDelete: Function,
  toggleIsFavorite?: Function
}
