import React, {ReactElement} from 'react';
import {StyleProp, TextStyle, ViewStyle} from 'react-native';
import {Text, View, Colors} from 'react-native-ui-lib';
import {MyContext, AppContext} from '../../App';

interface BadgeProps {
  text?: string;
  onPress?: Function;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  customElement?: ReactElement;
}

function Badge({
  text,
  onPress,
  containerStyle,
  textStyle,
  customElement,
}: BadgeProps) {
  return (
    <View center style={containerStyle}>
      <Text style={textStyle}>{text}</Text>
    </View>
  );
}

export default Badge;
