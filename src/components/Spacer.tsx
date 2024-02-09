import React from 'react';
import {View} from 'react-native';
import {SpacerStyles as styles} from '../styles/Styles';

export default function Spacer(props: {times: number}) {
  return <View style={[{height: props.times * 5}, styles.container]} />;
}
