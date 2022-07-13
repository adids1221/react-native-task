import React from 'react';
import {View, Colors, Constants} from 'react-native-ui-lib';
import {FlatList, StyleSheet, StyleProp, ViewStyle} from 'react-native';
import Card from './Card';
import Content from './Content';

interface CarosuelProps {
  items?: Array<any>;
  image?: string;
  text?: string;
  onPress?: Function;
  style?: StyleProp<ViewStyle>;
  customElement?: React.ReactElement;
  customeObject?: Object;
}

function Carousel({
  items,
  image,
  text,
  onPress,
  style,
  customElement,
  customeObject,
}: CarosuelProps) {
  return (
    <FlatList
      data={items}
      renderItem={({item: movie}) => {
        return (
          <View
            style={[styles.conatiner, styles.shadowProp]}
            center
            marginT-30
            marginH-40>
            <Card
              key={movie.id}
              customeObject={movie}
              image={movie.poster_path}
              onPress={onPress}
              customElement={
                <Content
                  original_title={movie.original_title}
                  overview={movie.overview}
                  release_date={movie.release_date}
                  vote_average={movie.vote_average}
                />
              }
              imageStyle={styles.cardImage}
            />
          </View>
        );
      }}
      keyExtractor={item => item.id}
      horizontal
      showsHorizontalScrollIndicator={false}
      pagingEnabled={true}
      //onEndreached={}
    />
  );
}

const styles = StyleSheet.create({
  cardImage: {
    width: 155,
    height: 155,
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.7,
    shadowRadius: 3,
  },
  conatiner: {
    backgroundColor: Colors.grey70,
    shadowColor: Colors.grey20,
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.4,
    shadowRadius: 3,
    borderWidth: 1,
    borderRadius: 20,
    overflow: 'hidden',
    alignItems: 'stretch',
  },
});

export default Carousel;
