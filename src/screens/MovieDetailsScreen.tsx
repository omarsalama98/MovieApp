import React from 'react';
import {Image, Text, View} from 'react-native';
import {DetailsScreenNavigationProp, Movie} from '../utils/Types';
import {MovieDetailsScreenStyles as styles} from '../styles/Styles';
import {Dimensions} from 'react-native';
import Spacer from '../components/Spacer';
import {ScrollView} from 'react-native-gesture-handler';

const window_height = Dimensions.get('window').height;

export default function MovieDetailsScreen({
  route,
}: DetailsScreenNavigationProp) {
  const movie: Movie = route.params.movie;

  const getRatingColor = (rating: number) => {
    if (rating < 4.0) {
      return '#F66';
    } else if (rating < 7.5) {
      return '#FF0';
    } else {
      return '#0F0';
    }
  };

  const poster_url = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollview}>
        <View
          style={[styles.details_container, {marginTop: window_height * 0.4}]}>
          <Text style={styles.title}>{movie.title}</Text>
          <Spacer times={2} />
          <View style={styles.rating_release_date_container}>
            <Text>
              <Text style={styles.rating}>{'Rating: '}</Text>
              <Text
                style={[
                  styles.rating,
                  {color: getRatingColor(movie.vote_average)},
                ]}>
                {`${movie.vote_average.toPrecision(2)}`}
              </Text>
            </Text>
            <Text>
              <Text style={styles.rating}>{'Release date: '}</Text>
              <Text style={[styles.rating]}>{`${movie.release_date}`}</Text>
            </Text>
          </View>
          <Spacer times={3} />
          <Text style={styles.overview}>{movie.overview}</Text>
          <Spacer times={8} />
        </View>
        <Image
          source={{
            uri: poster_url,
          }}
          resizeMode="cover"
          style={[styles.image, {height: window_height * 0.4}]}
        />
      </ScrollView>
    </View>
  );
}
