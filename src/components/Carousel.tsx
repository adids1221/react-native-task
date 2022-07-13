import React from 'react';
import {View, Colors, Constants, Button} from 'react-native-ui-lib';
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
      contentContainerStyle={{alignItems: 'flex-start'}}
      renderItem={({item: movie}) => {
        return (
          <View style={[styles.conatiner]} center marginT-30 marginH-40>
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
                  style={styles.contentContainer}
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
    shadowOpacity: 10,
    shadowRadius: 3,
  },
  conatiner: {
    backgroundColor: Colors.grey70,
    borderWidth: 0.3,
    borderRadius: 20,
    overflow: 'hidden',
  },
  contentContainer: {
    width: 250,
    margin: 10,
  },
});

export default Carousel;
