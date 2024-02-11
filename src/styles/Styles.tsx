import {StyleSheet} from 'react-native';

export const SpacerStyles = StyleSheet.create({
  container: {
    width: '100%',
  },
});

export const MoviesScreenStyles = StyleSheet.create({
  title: {
    fontSize: 30,
    textAlign: 'center',
    right: 0,
    left: 0,
    paddingVertical: '2%',
    bottom: 0,
    fontWeight: '700',
    color: '#FFF',
    fontStyle: 'italic',
    position: 'absolute',
    backgroundColor: '#000000D9',
  },
  image: {
    resizeMode: 'cover',
  },
  list_item_container: {
    width: '100%',
  },
});

export const MovieDetailsScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  details_container: {
    backgroundColor: '#000000DF',
    width: '100%',
    padding: 5,
    zIndex: 1,
    height: '100%',
  },
  scrollview: {
    backgroundColor: 'black',
  },
  rating_release_date_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 30,
    color: '#FFF',
    fontWeight: '700',
    fontStyle: 'italic',
  },
  overview: {
    fontSize: 20,
    color: '#FFF',
    fontStyle: 'italic',
  },
  rating: {
    fontSize: 20,
    color: '#FFF',
    fontStyle: 'italic',
  },
  release_date: {
    fontSize: 20,
    color: '#FFF',
    fontStyle: 'italic',
  },
  image: {
    position: 'absolute',
    width: '100%',
  },
});
