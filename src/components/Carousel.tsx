import React, {useRef, useState} from 'react';
import {
  View,
  Colors,
  Constants,
  Button,
  ColorSliderGroup,
} from 'react-native-ui-lib';
import {FlatList, StyleSheet, StyleProp, ViewStyle} from 'react-native';
import Card from './Card';
import Content from './Content';
import {MyContext, AppContext} from '../../App';
interface CarosuelProps {
  items?: Array<any>;
  image?: string;
  text?: string;
  onPress?: Function;
  onEndReached?: Function;
  style?: StyleProp<ViewStyle>;
  customElement?: React.ReactElement;
  customeObject?: Object;
}

function Carousel({
  items,
  image,
  text,
  onPress,
  onEndReached,
  style,
  customElement,
  customeObject,
}: CarosuelProps) {
  let {currResults} = React.useContext(MyContext) as AppContext;
  const [currIndex, setCurrIndex] = useState(0);
  const flatlistRef = useRef<FlatList>(null);

  const scrollToStart = () => {
    let index = 0;
    flatlistRef.current?.scrollToIndex({index});
  };

  const scrollToEnd = () => {
    if (currIndex + 10 < currResults) {
      let index = currIndex + 10;
      setCurrIndex(currIndex + 10);
      flatlistRef.current?.scrollToIndex({index});
    }
    setCurrIndex(currIndex + 10);
  };

  return (
    <>
      <FlatList
        data={items}
        ref={flatlistRef}
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
        onScrollToIndexFailed={() => {}}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
      />
      <View style={{flexDirection: 'row'}}>
        <Button
          onPress={() => scrollToStart()}
          style={styles.scrollButtons}
          center
          marginL-55
          marginR-45
          label={'Scroll To Start'}
          size={Button.sizes.medium}
          enableShadow
        />
        <Button
          onPress={() => scrollToEnd()}
          style={styles.scrollButtons}
          center
          label={'Scroll 10 Movies'}
          size={Button.sizes.medium}
          enableShadow
        />
      </View>
    </>
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
  scrollButtons: {
    marginTop: 30,
    backgroundColor: Colors.orange40,
  },
});

export default Carousel;
