import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeModules, Platform} from 'react-native';
import {Movie, MoviesResponse} from './Types';

// API token for TMDB movie database, (Should be stored `encrypted` in a secure place like in the backend)
const API_TOKEN =
  'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NmQzYTkzNDk3Y2M4ZjYwMmRlYmMwM2E1YWRkYTI3NiIsInN1YiI6IjY1YzM4Nzc2OGUyZTAwMDE4M2E2NWViOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DimQyXeLyO7eRW4M-2NuT2xZHdzt7gEokjOPaMX3t7w';

/**
 * A helper function to fetch the movies with pagination (optional),
 *      default value for page is 1.
 * @param {string} page(optional) - Which page to fetch from all movies.
 *
 * @returns {[Movie] | String} A list of movies in case it succeeded or an error string otherwise.
 */
export const fetchMovies = async (page?: number): Promise<string | [Movie]> => {
  const url = `https://api.themoviedb.org/3/discover/movie?page=${page ?? 1}`;
  return AsyncStorage.getItem(url).then(cached_results => {
    if (cached_results !== null) {
      return JSON.parse(cached_results);
    } else {
      if (Platform.OS === 'ios') {
        const options = {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: API_TOKEN,
          },
        };
        return fetch(url, options)
          .then(response => response.json())
          .then((response: MoviesResponse) => {
            const optimized_movies = response.results.map(result => {
              const {title, backdrop_path, overview, vote_average} = result;
              return {title, backdrop_path, overview, vote_average};
            });
            return AsyncStorage.setItem(
              url,
              JSON.stringify(optimized_movies),
            ).then(() => {
              return response.results;
            });
          })
          .catch(error => {
            console.error(error);
            return error?.toString() ?? 'Error fetching movies';
          });
      } else {
        const {APIModule} = NativeModules;
        APIModule.nativeFetch(url, API_TOKEN, (response: any) => {
          try {
            const response_object: MoviesResponse = JSON.parse(response);
            const optimized_movies = response_object.results.map(result => {
              const {title, backdrop_path, overview, vote_average} = result;
              return {title, backdrop_path, overview, vote_average};
            });
            return AsyncStorage.setItem(url, JSON.stringify(optimized_movies))
              .then(() => {
                return response_object.results;
              })
              .catch(e => {
                return e.toString();
              });
          } catch (error) {
            return error?.toString() ?? 'Error fetching movies';
          }
        });
      }
    }
  });
};
