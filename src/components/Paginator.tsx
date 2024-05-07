import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

export default function Paginator(props: {
  current_page: number;
  hasNext: boolean;
  hasPrevious: boolean;
  onNextPressed: () => void;
  onPreviousPressed: () => void;
}) {
  return (
    <View
      style={{
        justifyContent: 'space-between',
        flexDirection: 'row',
        padding: 10,
      }}>
      <TouchableOpacity
        disabled={props.hasPrevious === false}
        onPress={props.onPreviousPressed}>
        <Text style={{color: props.hasPrevious ? 'black' : 'grey'}}>
          {'< PREV'}
        </Text>
      </TouchableOpacity>
      <Text>{props.current_page}</Text>
      <TouchableOpacity
        disabled={props.hasNext === false}
        onPress={props.onNextPressed}>
        <Text style={{color: props.hasNext ? 'black' : 'grey'}}>
          {'NEXT >'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
