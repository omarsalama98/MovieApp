import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeModules} from 'react-native';
import {MovieOpt, MoviesResponse} from './Types';

// API token for TMDB movie database, (Should be stored `encrypted` in a secure place like in the backend)
const API_TOKEN =
  'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYjU0OTI0Yzk1YjljZTY1ZjU1ODI4OTZlOGRkMGM1NyIsInN1YiI6IjY1YzM4Nzc2OGUyZTAwMDE4M2E2NWViOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rv3QTuh_IvC0mcOfCsVADPg6jyNU2opy7rrcPTtgxiA';

/**
 * A helper function to fetch the movies with pagination (optional),
 *      default value for page is 1.
 * @param {string} page(optional) - Which page to fetch from all movies.
 *
 * @returns {[Movie] | String} A list of movies in case it succeeded or an error string otherwise.
 */
export async function fetchMovies(
  page: number,
  setMovies: (movies: MovieOpt[] | string | undefined) => any,
) {
  const url = `https://api.themoviedb.org/3/discover/movie?page=${page ?? 1}`;
  AsyncStorage.getItem(url).then(cached_results => {
    if (cached_results !== null) {
      setMovies(JSON.parse(cached_results));
    } else {
      const {APIModule} = NativeModules;
      APIModule.nativeFetch(url, API_TOKEN, (response: any) => {
        try {
          const response_object: MoviesResponse = JSON.parse(response);
          const optimized_movies = response_object.results.map(result => {
            const {title, backdrop_path, overview, vote_average, release_date} =
              result;
            return {title, backdrop_path, overview, vote_average, release_date};
          });
          AsyncStorage.setItem(url, JSON.stringify(optimized_movies))
            .then(() => {
              setMovies(optimized_movies);
            })
            .catch(e => {
              setMovies(e.toString());
            });
        } catch (error) {
          setMovies(error?.toString() ?? 'Error fetching movies');
        }
      });
    }
  });
}
