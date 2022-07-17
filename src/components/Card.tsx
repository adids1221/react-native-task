import React, {useState, useEffect, ReactElement, useRef} from 'react';
import {
  StyleSheet,
  StyleProp,
  ViewStyle,
  ImageStyle,
  TextStyle,
} from 'react-native';
import {
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  Image,
  Colors,
} from 'react-native-ui-lib';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withRepeat,
  FadeOutDown,
  FadeOut,
  FadeIn,
} from 'react-native-reanimated';
import {selectedIcon} from '../assets/index';
import {MyContext, AppContext} from '../../App';

interface CardProps {
  image?: string;
  text?: string;
  // onPress?: TouchableOpacityProps['onPress'];
  onPress?: (customeObject?: Object) => void;
  cover?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
  textStyle?: StyleProp<TextStyle>;
  customElement?: ReactElement;
  customeObject?: Object;
  animationFlag?: boolean;
  isSelected?: boolean;
}

function Card({
  image,
  text,
  onPress,
  containerStyle,
  imageStyle,
  textStyle,
  customElement,
  customeObject,
  animationFlag,
  isSelected,
  cover = true,
}: CardProps) {
  const posterURL = `https://image.tmdb.org/t/p/original${image}`;
  const selectedOverlay = (
    <View center paddingT-50>
      <Image source={selectedIcon} style={styles.selectedIconStyle} />
    </View>
  );
  //Reanimated
  const size = 100.0;
  const progress = useSharedValue(0.5); //Set value that could be handeld from the worklets
  const scale = useSharedValue(2);
  const animationStyle = useAnimatedStyle(() => {
    return {
      opacity: progress.value,
      borderRadius: (progress.value * size) / 2,
      transform: [
        {scale: scale.value},
        {rotate: `${progress.value * 2 * Math.PI}rad`},
      ],
    };
  }, []);

  let reanimatedStyle = image ? animationStyle : {};

  useEffect(() => {
    progress.value = withRepeat(withSpring(1), 3, true);
    scale.value = withRepeat(withSpring(1), 3, true);
  }, []);

  const userOnPress = () => {
    onPress?.(customeObject);
  };

  return (
    <View style={[containerStyle, {}]} center flexS>
      <TouchableOpacity onPress={userOnPress}>
        <Image
          source={{uri: posterURL}}
          cover={cover}
          style={imageStyle}
          overlayColor={isSelected ? Colors.grey30 : undefined}
          overlayType={isSelected ? 'TOP' : undefined}
          customOverlayContent={isSelected ? selectedOverlay : undefined}
        />
      </TouchableOpacity>
      <View style={styles.contentContainer}>{customElement}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    width: 250,
    margin: 10,
  },
  selectedConatiner: {
    position: 'absolute',
    opacity: 1,
    backgroundColor: Colors.black10,
  },
  selectedIconStyle: {
    width: 100,
    height: 100,
    justifyContent: 'center',
  },
});

export default Card;
