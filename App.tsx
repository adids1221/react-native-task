import React from 'react';
import {ActivityIndicator, ScrollView, StyleSheet} from 'react-native';
import {Button, View} from 'react-native-ui-lib';
import {Movie, createApiClient} from './src/api';
import Carousel from './src/components/Carousel';
import _ from 'lodash';
import Stack from './src/components/Stack';

const api = createApiClient();

export type AppContext = {
  movies: MyMovie[];
  selectedMoviesNumber: number;
  stackSize: number;
  totalResults: number;
  totalPages: number;
  currResults: number;
  currPage: number;
};

export interface MyMovie extends Movie {
  isSelected?: boolean;
}

export const MyContext = React.createContext<AppContext | undefined>(undefined);

export default class App extends React.Component<{}, AppContext> {
  state: AppContext = {
    movies: [],
    selectedMoviesNumber: 0,
    stackSize: 0,
    totalResults: 0,
    totalPages: 0,
    currResults: 0,
    currPage: 0,
  };

  async componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    const {results, total_results, total_pages} = await api.getMovies();
    let {currResults} = this.state;
    const myMovieRes: MyMovie[] = results.slice(
      0,
      currResults + results.length,
    );
    this.setState({
      totalResults: total_results,
      totalPages: total_pages,
      movies: myMovieRes,
      currResults: currResults + results.length,
      currPage: 1,
    });
  };

  loadMoreDate = async () => {
    let {movies, currResults, currPage, totalPages, totalResults} = this.state;
    if (currResults < totalResults && currPage < totalPages) {
      const {results, total_results} = await api.getMovies(currPage + 1);
      if (total_results != totalResults) {
        totalResults = total_results;
      }
      const enrichmentMovies: any = results;
      movies = [...movies, ...enrichmentMovies];
      this.setState({
        totalResults: totalResults,
        movies: movies,
        currResults: currResults + results.length,
        currPage: currPage + 1,
      });
    }
  };

  componentDidUpdate(_: {}, previousState) {}

  selectMovie = (movie: MyMovie) => {
    const movieId = movie?.id;
    let {selectedMoviesNumber, movies} = this.state;
    const movieIndex = _.findIndex(movies, movie => movie.id === movieId);
    if (movieIndex != -1 && movie.isSelected === true) {
      movie.isSelected = false;
      selectedMoviesNumber -= 1;
    } else if (movieIndex != -1) {
      movie.isSelected = true;
      selectedMoviesNumber += 1;
    }
    this.setState({
      movies: movies,
      selectedMoviesNumber: selectedMoviesNumber,
    });
  };

  render() {
    const {movies, selectedMoviesNumber, stackSize} = this.state;
    return (
      <View flex useSafeArea>
        <MyContext.Provider value={this.state}>
          <ScrollView>
            {movies.length ? (
              <>
                <Carousel
                  items={movies}
                  onPress={this.selectMovie}
                  onEndReached={this.loadMoreDate}
                />
                <Stack
                  items={_.filter(movies, function (m) {
                    return m.isSelected === true;
                  })}
                  onPress={this.selectMovie}
                  imageStyle={styles.stackImage}
                />
              </>
            ) : (
              <ActivityIndicator
                size="large"
                style={{justifyContent: 'center'}}
              />
            )}
          </ScrollView>
        </MyContext.Provider>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  stackImage: {
    width: 120,
    height: 120,
  },
});
