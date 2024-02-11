import React, {useState, useEffect} from 'react';
import {
  FlatList,
  Image,
  NativeModules,
  Platform,
  SafeAreaView,
  Text,
} from 'react-native';
import {
  Movie,
  MoviesResponse,
  MoviesScreenNavigationProp,
} from '../utils/Types';
import {MoviesScreenStyles as styles} from '../styles/Styles';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default function MoviesScreen({navigation}: MoviesScreenNavigationProp) {
  const [movies, setMovies] = useState<Movie[]>();

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = () => {
    if (Platform.OS === 'android') {
      const {APIModule} = NativeModules;
      APIModule.nativeFetch(
        'https://api.themoviedb.org/3/discover/movie',
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NmQzYTkzNDk3Y2M4ZjYwMmRlYmMwM2E1YWRkYTI3NiIsInN1YiI6IjY1YzM4Nzc2OGUyZTAwMDE4M2E2NWViOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DimQyXeLyO7eRW4M-2NuT2xZHdzt7gEokjOPaMX3t7w',
        (response: any) => {
          try {
            const response_object: MoviesResponse = JSON.parse(response);
            setMovies(response_object.results);
          } catch (error) {
            return error?.toString() ?? 'Error fetching movies';
          }
        },
      );
    } else {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NmQzYTkzNDk3Y2M4ZjYwMmRlYmMwM2E1YWRkYTI3NiIsInN1YiI6IjY1YzM4Nzc2OGUyZTAwMDE4M2E2NWViOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DimQyXeLyO7eRW4M-2NuT2xZHdzt7gEokjOPaMX3t7w',
        },
      };

      fetch('https://api.themoviedb.org/3/discover/movie', options)
        .then(response => response.json())
        .then(response => setMovies(response.results))
        .catch(err => console.error(err));
    }
  };

  return (
    <SafeAreaView>
      <FlatList
        data={movies}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              style={styles.list_item_container}
              onPress={() => navigation.navigate('Details', {movie: item})}>
              <Image
                source={{
                  uri: `https://image.tmdb.org/t/p/original${item.backdrop_path}`,
                }}
                height={200}
                style={styles.image}
              />
              <Text style={styles.title}>{item.title}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
}
