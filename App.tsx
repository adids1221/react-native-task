import React from 'react';
import {ActivityIndicator, ScrollView, StyleSheet} from 'react-native';
import {View} from 'react-native-ui-lib';
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
};

export const MyContext = React.createContext<AppContext | undefined>(undefined);

export default class App extends React.Component<{}, AppContext> {
  state: AppContext = {
    movies: [],
    selectedMovies: [],
    selectedMoviesNumber: 0,
    stackSize: 0,
  };

  async componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    const {results, total_results} = await api.getMovies();
    this.setState({
      movies: results.slice(0, 10),
    });
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
    // console.log(selectedMovies);
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
                <Carousel items={movies} onPress={this.selectMovie} />

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
