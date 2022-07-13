import React, {ReactElement, useEffect} from 'react';
import {StyleProp, TextStyle, ViewStyle} from 'react-native';
import {Text, View, Colors} from 'react-native-ui-lib';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withRepeat,
} from 'react-native-reanimated';

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
  //Reanimated
  const size = 100.0;
  const progress = useSharedValue(0.5); //Set value that could be handeld from the worklets
  const scale = useSharedValue(2);
  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: progress.value,
      borderRadius: (progress.value * size) / 2,
      transform: [
        {scale: scale.value},
        {rotate: `${progress.value * 2 * Math.PI}rad`},
      ],
    };
  }, []);

  useEffect(() => {
    progress.value = withRepeat(withSpring(1), 3, true);
    scale.value = withRepeat(withSpring(1), 3, true);
  }, []);
  return (
    <View center style={containerStyle}>
      <Animated.View style={[reanimatedStyle]}>
        <Text style={textStyle}>{text}</Text>
      </Animated.View>
    </View>
  );
}

export default Badge;
