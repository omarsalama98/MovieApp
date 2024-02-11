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
        <Text>{'< PREV'}</Text>
      </TouchableOpacity>
      <Text>{props.current_page}</Text>
      <TouchableOpacity
        disabled={props.hasNext === false}
        onPress={props.onNextPressed}>
        <Text>{'NEXT >'}</Text>
      </TouchableOpacity>
    </View>
  );
}
