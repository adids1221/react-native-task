import React, {useState, useEffect, ReactElement} from 'react';
import {View, Colors} from 'react-native-ui-lib';
import {
  StyleSheet,
  StyleProp,
  ViewStyle,
  ImageStyle,
  TextStyle,
} from 'react-native';
import Card from './Card';
import Badge from './Badge';
import {MyContext, AppContext} from '../../App';

interface StackProps {
  items?: Array<any>;
  text?: string;
  onPress?: Function;
  style?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
  textstyle?: StyleProp<TextStyle>;
  customElement?: ReactElement;
  customeObject?: Object;
}

function Stack({
  items,
  text,
  onPress,
  style,
  imageStyle,
  textstyle,
  customElement,
  customeObject,
}: StackProps) {
  let {selectedMoviesNumber} = React.useContext(MyContext) as AppContext;

  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [deltaOffset, setDeltaOffset] = useState(0);

  let selectedMoviesLen: number;
  let lastThreeMovies: Array<any> = [];
  let badgePosition = 15;

  if (items) {
    selectedMoviesLen = items.length;
    lastThreeMovies = items.slice(
      selectedMoviesLen - (selectedMoviesNumber > 3 ? 3 : selectedMoviesNumber),
      selectedMoviesLen,
    );
  }

  useEffect(() => {
    setOffsetX(offsetX + deltaOffset);
    setOffsetY(offsetY + deltaOffset);
  }, [deltaOffset]);

  return (
    <View flex marginT-100 height={240}>
      {selectedMoviesNumber ? (
        lastThreeMovies.map((movie, index) => {
          let offset = 15 * -(lastThreeMovies.length - 1 - index);
          return (
            <Card
              containerStyle={[
                styles.shadowProp,
                {
                  position: 'absolute',
                  right: 0,
                  top: 0,
                  left: offset,
                  bottom: offset,
                },
              ]}
              imageStyle={styles.cardImage}
              image={movie.poster_path}
              animationFlag={true}
              key={movie.id}
            />
          );
        })
      ) : (
        <Card
          containerStyle={{
            position: 'absolute',
            right: 0,
            top: 0,
            left: 0,
            bottom: 0,
          }}
          animationFlag={false}
          imageStyle={styles.cardImage}
        />
      )}

      {selectedMoviesNumber ? (
        <Badge
          text={`${selectedMoviesNumber}`}
          textStyle={styles.badgeTextStyle}
          containerStyle={[
            styles.badgeStyle,
            styles.shadowProp,
            {
              right: badgePosition + 100,
              top: badgePosition + 10,
            },
          ]}
        />
      ) : undefined}

      {customElement}
    </View>
  );
}

const styles = StyleSheet.create({
  cardImage: {
    width: 150,
    height: 150,
    borderWidth: 0.2,
    borderRadius: 25,
    backgroundColor: Colors.blue80,
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.7,
    shadowRadius: 10,
  },
  badgeStyle: {
    position: 'absolute',
    backgroundColor: Colors.red40,
    borderRadius: 999,
    borderWidth: 0.17,
    width: 25,
    height: 25,
  },
  badgeTextStyle: {
    textAlign: 'center',
    fontSize: 20,
    color: 'white',
  },
});
export default Stack;
