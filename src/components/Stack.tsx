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
import {MyContext, AppContext, MyMovie} from '../../App';
import {Movie} from '../api';

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
  let selectedMoviesLen: number;
  let lastThreeMovies: Array<any> = [];
  let badgePosition = 15;
  if (items) {
    selectedMoviesLen = items.length;
    lastThreeMovies = items.slice(
      selectedMoviesLen > 3 ? -3 : -selectedMoviesLen,
    );
  }

  const renderCard = (movie?: MyMovie, offset?: number) => {
    return (
      <Card
        containerStyle={[
          styles.shadowProp,
          {
            position: 'absolute',
            right: 0,
            top: 0,
            left: movie ? offset : 0,
            bottom: movie ? offset : 0,
          },
        ]}
        cover={false}
        imageStyle={styles.cardImage}
        image={movie && movie.poster_path}
        animationFlag={movie ? true : false}
        key={movie && movie.id}
      />
    );
  };

  return (
    <View flex marginT-100 height={240}>
      {selectedMoviesNumber ? (
        <>
          {lastThreeMovies.map((movie, index) => {
            let offset = 15 * -(lastThreeMovies.length - 1 - index);
            return renderCard(movie, offset);
          })}
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
        </>
      ) : (
        renderCard()
      )}
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
