import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import MoviesScreen from './src/screens/MoviesScreen';
import MovieDetailsScreen from './src/screens/MovieDetailsScreen';
import {RootStackParamList} from './src/utils/Types';

const Stack = createStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Movies">
        <Stack.Screen name="Movies" component={MoviesScreen} />
        <Stack.Screen
          name="Details"
          component={MovieDetailsScreen}
          initialParams={{movie: undefined}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
