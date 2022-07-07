import React, {Component} from 'react';
import {Text, View} from 'react-native-ui-lib';
import {SafeAreaView, ActivityIndicator} from 'react-native';
import {Movie, createApiClient} from './src/api';
import Card from './src/components/Card';
import Badge from './src/components/Badge';
import Carousel from './src/components/Carousel';
import Stack from './src/components/Stack';

const api = createApiClient();

export type AppContext = {
  movies: Movie[];
  selectedMovies: Movie[];
  selectedMoviesNumber: number;
  stackSize: number;
  selectMovie?: (movie: Movie) => void;
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
    //fetch the data
    this.fetchData();
    this.setState({
      selectMovie: this.selectMovie,
    });
    //check the selected movies and update the stack and etc...
  }

  fetchData = async () => {
    const {results, total_results} = await api.getMovies();
    this.setState({
      movies: results.slice(0, 10),
    });
  };

  componentDidUpdate(_: {}, previousState) {
    console.log(this.state.selectedMovies);
  }

  selectMovie = (movie: Movie) => {
    const {selectedMovies} = this.state;
    this.setState({
      selectedMovies: [...selectedMovies, movie],
    });
  };

  render() {
    const {movies, selectedMovies, selectedMoviesNumber, stackSize} =
      this.state;
    return (
      <>
        <MyContext.Provider value={this.state}>
          <SafeAreaView>
            {movies.length ? (
              // <Card
              //   bg-$backgroundDefault
              //   movie={movies[1]}
              //   selectMovie={this.selectMovie}
              // />
              <Carousel />
            ) : (
              <ActivityIndicator size="large" />
            )}
          </SafeAreaView>
        </MyContext.Provider>
      </>
    );
  }
}
