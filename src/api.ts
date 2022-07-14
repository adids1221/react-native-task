import axios from "axios";

export interface Movie {
    id: number;
    poster_path: string;
    backdrop_path: string;
    adult: boolean;
    release_date: string;
    original_title: string;
    overview: string;
    popularity: number;
    genre_ids: number;
    vote_count: number;
    vote_average: string;
};

export type Genre = {
    id: number;
    name: string;
};

type MoviesResponse = {
    page: number,
    dates: object,
    results: Movie[],
    total_pages: number,
    total_results: number
};

export type ApiClient = {
    getMovies: (page?: number
    ) => Promise<MoviesResponse>;
};

const api_key = '9f5bfb9e46dc9d29842c84653c92251f'

const appAxios = axios.create({
    baseURL: "https://api.themoviedb.org/3",
});

export const createApiClient = (): ApiClient => {
    return {
        getMovies: (page?: number
        ) => {
            return appAxios.get(`/movie/upcoming`, { params: { api_key, page: (page ? page : {}) } }).then((res) => res.data)
        }
    }
}