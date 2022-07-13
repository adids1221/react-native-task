import React, {useState, useEffect, ReactElement, useRef} from 'react';
import {
  StyleSheet,
  StyleProp,
  ViewStyle,
  ImageStyle,
  TextStyle,
} from 'react-native';
import {TouchableOpacity, View, Image, Colors} from 'react-native-ui-lib';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

interface CardProps {
  image?: string;
  text?: string;
  onPress?: Function;
  seconderyOnPress?: Function;
  containerStyle?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
  textStyle?: StyleProp<TextStyle>;
  customElement?: ReactElement;
  customeObject?: Object;
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
}: CardProps) {
  const posterURL = `https://image.tmdb.org/t/p/original${image}`;
  const [isSelected, setIsSelected] = useState(false);
  //Avoid useEffect hook on initial render
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) {
      onPress?.(customeObject);
    } else {
      didMount.current = true;
    }
  }, [isSelected]);

  return (
    <View style={containerStyle} center flex>
      {onPress ? (
        <TouchableOpacity onPress={() => setIsSelected(!isSelected)}>
          <Image source={{uri: posterURL}} cover={true} style={imageStyle} />
        </TouchableOpacity>
      ) : (
        <Image source={{uri: posterURL}} style={imageStyle} />
      )}
      <View style={styles.contentContainer}>{customElement}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    width: 250,
    margin: 10,
  },
});

export default Card;
