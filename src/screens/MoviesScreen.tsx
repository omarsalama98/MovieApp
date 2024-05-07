import React, {useState, useEffect} from 'react';
import {FlatList, Image, Modal, SafeAreaView, Text} from 'react-native';
import {MovieOpt, MoviesScreenNavigationProp} from '../utils/Types';
import {MoviesScreenStyles as styles} from '../styles/Styles';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Paginator from '../components/Paginator';
import {fetchMovies} from '../utils/APIHelper';
import Loading from '../components/Loading';

export default function MoviesScreen({navigation}: MoviesScreenNavigationProp) {
  const [movies, setMovies] = useState<MovieOpt[]>();
  const [api_error, setAPIError] = useState<string>();
  const [current_page, setCurrentPage] = useState<number>(1);
  const [fetching_movies, setFetchingMovies] = useState<boolean>(true);

  useEffect(() => {
    fetchMovies(1, fetched_movies => {
      if (typeof fetched_movies === 'string' || fetched_movies === undefined) {
        // There was an error
        setAPIError(fetched_movies ?? 'Error in data fetch');
      } else {
        setMovies(fetched_movies);
        setFetchingMovies(false);
      }
    });
  }, []);

  const fetchNextPage = () => {
    setFetchingMovies(true);
    fetchMovies(current_page + 1, fetched_movies => {
      if (typeof fetched_movies === 'string' || fetched_movies === undefined) {
        // There was an error
        setAPIError(fetched_movies ?? 'Error in data fetch');
      } else {
        setMovies(fetched_movies);
        setCurrentPage(current_page + 1);
        setFetchingMovies(false);
      }
    });
  };

  const fetchPreviousPage = () => {
    setFetchingMovies(true);
    fetchMovies(current_page - 1, fetched_movies => {
      if (typeof fetched_movies === 'string' || fetched_movies === undefined) {
        // There was an error
        setAPIError(fetched_movies ?? 'Error in data fetch');
      } else {
        setMovies(fetched_movies);
        setCurrentPage(current_page - 1);
        setFetchingMovies(false);
      }
    });
  };

  return fetching_movies ? (
    <Loading />
  ) : (
    <SafeAreaView style={{flex: 1}}>
      <Modal
        visible={api_error !== undefined}
        style={{
          height: '50%',
          width: '80%',
          flex: 1,
        }}>
        <Text
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
          }}>
          {api_error}
        </Text>
      </Modal>
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
                height={220}
                style={styles.image}
              />
              <Text style={styles.title}>{item.title}</Text>
            </TouchableOpacity>
          );
        }}
      />
      <Paginator
        current_page={current_page}
        hasNext={true}
        hasPrevious={current_page > 1}
        onNextPressed={fetchNextPage}
        onPreviousPressed={fetchPreviousPage}
      />
    </SafeAreaView>
  );
}
