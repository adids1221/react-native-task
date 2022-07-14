import React from 'react';
import {ActivityIndicator, ScrollView, StyleSheet} from 'react-native';
import {Button, View} from 'react-native-ui-lib';
import {Movie, createApiClient} from './src/api';
import Carousel from './src/components/Carousel';
import _ from 'lodash';
import Stack from './src/components/Stack';

const api = createApiClient();

export type AppContext = {
  movies: Movie[];
  selectedMovies: Movie[];
  selectedMoviesNumber: number;
  stackSize: number;
  totalResults: number;
  totalPages: number;
  currResults: number;
  currPage: number;
};

export const MyContext = React.createContext<AppContext | undefined>(undefined);

export default class App extends React.Component<{}, AppContext> {
  state: AppContext = {
    movies: [],
    selectedMovies: [],
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
    // console.log(
    //   `total res: ${total_results} || res len: ${results.length} || total pages: ${total_pages}`,
    // );
    let {currResults} = this.state;
    this.setState({
      totalResults: total_results,
      totalPages: total_pages,
      movies: results.slice(0, currResults + results.length),
      currResults: currResults + results.length,
      currPage: 1,
    });
    // console.log(this.state.movies.length);
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
      // console.log(
      //   `movies len: ${movies.length} || res len: ${
      //     results.length
      //   } || page: ${currPage + 1}`,
      // );
      this.setState({
        totalResults: totalResults,
        movies: movies,
        currResults: currResults + results.length,
        currPage: currPage + 1,
      });
    }
  };

  componentDidUpdate(_: {}, previousState) {}

  selectMovie = (movie: Movie) => {
    const movieId = movie.id;
    let {selectedMovies} = this.state;
    if (_.findIndex(selectedMovies, movie => movie.id === movieId) != -1) {
      selectedMovies = _.filter(selectedMovies, movie => movie.id != movieId);
    } else {
      selectedMovies.push(movie);
    }
    this.setState({
      selectedMovies: selectedMovies,
      selectedMoviesNumber: selectedMovies.length,
    });
  };

  clearSelectedMovies = () => {
    this.setState({
      selectedMovies: [],
      selectedMoviesNumber: 0,
    });
  };

  render() {
    const {movies, selectedMovies, selectedMoviesNumber, stackSize} =
      this.state;
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
                  items={selectedMovies}
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
