import React, {useState, useEffect} from 'react';
import {FlatList, Image, Modal, SafeAreaView, Text} from 'react-native';
import {Movie, MoviesScreenNavigationProp} from '../utils/Types';
import {MoviesScreenStyles as styles} from '../styles/Styles';
import {TouchableOpacity} from 'react-native-gesture-handler';
import NetInfo from '@react-native-community/netinfo';
import Paginator from '../components/Paginator';
import {fetchMovies} from '../utils/APIHelper';

export default function MoviesScreen({navigation}: MoviesScreenNavigationProp) {
  const [movies, setMovies] = useState<Movie[]>();
  const [api_error, setAPIError] = useState<string>();
  const [current_page, setCurrentPage] = useState<number>(1);
  const [is_offline, setIsOffline] = useState<boolean>(false);

  NetInfo.addEventListener(networkState => {
    setIsOffline(networkState.isConnected === false);
  });

  useEffect(() => {
    fetchMovies()
      .then(result => {
        if (typeof result === 'string' || result === undefined) {
          // There was an error
          setAPIError(result ?? 'Error in data fetch');
        } else {
          setMovies(result);
        }
      })
      .catch(e => {
        setAPIError(e);
      });
  }, []);

  const fetchNextPage = () => {
    fetchMovies(current_page + 1).then(result => {
      if (typeof result === 'string' || result === undefined) {
        setAPIError(result ?? 'Error in data fetch');
      } else {
        setMovies(result);
        setCurrentPage(current_page + 1);
      }
    });
  };

  const fetchPreviousPage = () => {
    fetchMovies(current_page - 1)?.then(result => {
      if (typeof result === 'string' || result === undefined) {
        setAPIError(result ?? 'Error in data fetch');
      } else {
        setMovies(result);
        setCurrentPage(current_page - 1);
      }
    });
  };

  return (
    <SafeAreaView>
      <Modal
        visible={is_offline || api_error !== undefined}
        style={{
          backgroundColor: 'white',
          height: '50%',
          width: '80%',
          alignSelf: 'center',
        }}>
        <Text>
          {is_offline
            ? 'You are Offline, please check your connection'
            : api_error}
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
        hasNext={is_offline === false}
        hasPrevious={current_page > 1}
        onNextPressed={fetchNextPage}
        onPreviousPressed={fetchPreviousPage}
      />
    </SafeAreaView>
  );
}
