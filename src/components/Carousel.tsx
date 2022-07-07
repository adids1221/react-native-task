import React from 'react';
import {Text, TouchableOpacity, View, Image, Colors} from 'react-native-ui-lib';
import {FlatList} from 'react-native';
import {Movie} from '../api';
import Card from './Card';
import {MyContext, AppContext} from '../../App';

function Carousel() {
  const {movies, selectMovie} = React.useContext(MyContext) as AppContext;

  return (
    <View>
      <FlatList
        data={movies}
        // renderItem={({item: movie, index}) => {
        //   return <Card movie={movie} selectMovie={selectMovie} />;
        // }}
        renderItem={({item: movie, index}) => {
          return <Card movie={movie} selectMovie={selectMovie} />;
        }}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

export default Carousel;
