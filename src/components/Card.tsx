import React from 'react';
import {Text, TouchableOpacity, View, Image, Colors} from 'react-native-ui-lib';
import {Movie} from '../api';
import Content from './Content';
import {MyContext, AppContext} from '../../App';

function Card({movie, selectMovie}: {movie: Movie; selectMovie: Function}) {
  const posterURL = `https://image.tmdb.org/t/p/original${movie.poster_path}`;
  const {original_title, overview, vote_average, release_date} = movie;

  return (
    <View marginT-10>
      <View
        style={{
          backgroundColor: Colors.grey70,
          borderRadius: 20,
          overflow: 'hidden',
        }}
        center
        marginT-20
        marginL-35
        marginR-35>
        <View>
          <TouchableOpacity onPress={() => selectMovie(movie)}>
            <Image
              source={{uri: posterURL}}
              cover={true}
              width={155}
              height={155}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            padding: 10,
            width: 300,
          }}>
          <Content
            original_title={original_title}
            overview={overview}
            release_date={release_date}
            vote_average={vote_average}
          />
        </View>
      </View>
    </View>
  );
}

export default Card;
