import type {StackScreenProps} from '@react-navigation/stack';

export type Movie = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type MoviesResponse = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};

export type RootStackParamList = {
  Movies: undefined;
  Details: {movie: Movie};
};

export type DetailsScreenNavigationProp = StackScreenProps<
  RootStackParamList,
  'Details'
>;

export type MoviesScreenNavigationProp = StackScreenProps<
  RootStackParamList,
  'Movies'
>;
