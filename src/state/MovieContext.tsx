import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
} from 'react';
import {
  fetchPopularMovies,
  fetchSearchMovies,
  fetchGenreList,
} from '../api/api';

export type Genre = {
  id: number;
  name: string;
};

export type Movie = {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  vote_average?: number;
  genre_ids?: number[];
};

type MovieContextType = {
  movies: Movie[];
  isLoading: boolean;
  loadMoreMovies: () => void;
  refreshMovies: () => Promise<void>;
  searchMovies: () => Promise<void>;
  searchResults: Movie[];
  searchLoading: boolean;
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  clearSearch: () => void;
  genres: Genre[];
  genreFilter: number | null;
  setGenreFilter: React.Dispatch<React.SetStateAction<number | null>>;
  ratingFilter: number | null;
  setRatingFilter: React.Dispatch<React.SetStateAction<number | null>>;
  filteredMovies: Movie[];
  searchPage: number;
  loadMoreSearchResults: () => void;
};

const MovieContext = createContext<MovieContextType>({
  movies: [],
  isLoading: false,
  loadMoreMovies: () => {},
  refreshMovies: async () => {},
  searchMovies: async () => {},
  searchResults: [],
  searchLoading: false,
  query: '',
  setQuery: () => {},
  clearSearch: () => {},
  genres: [],
  genreFilter: null,
  setGenreFilter: () => {},
  ratingFilter: null,
  setRatingFilter: () => {},
  filteredMovies: [],
  searchPage: 1,
  loadMoreSearchResults: () => {},
});

export const MovieProvider = ({children}: {children: React.ReactNode}) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchPage, setSearchPage] = useState(1);

  const [genres, setGenres] = useState<Genre[]>([]);

  const [genreFilter, setGenreFilter] = useState<number | null>(null);
  const [ratingFilter, setRatingFilter] = useState<number | null>(null);

  useEffect(() => {
    const loadGenres = async () => {
      const fetchedGenres = await fetchGenreList();
      setGenres(fetchedGenres);
    };
    loadGenres();
  }, []);

  const shuffleArray = (array: Movie[]) => {
    return [...array].sort(() => Math.random() - 0.5);
  };

  const loadMovies = async (pageToLoad: number) => {
    setIsLoading(true);
    const data = await fetchPopularMovies(pageToLoad);
    const shuffled = shuffleArray(data);
    setIsLoading(false);
    return shuffled;
  };

  const refreshMovies = async () => {
    setIsLoading(true);
    setPage(1);
    const freshMovies = await loadMovies(1);
    setMovies(freshMovies);
    setIsLoading(false);
  };

  useEffect(() => {
    if (page === 1) {
      return;
    }
    loadMovies(page).then(newMovies => {
      setMovies(prev => [...prev, ...newMovies]);
    });
  }, [page]);

  const loadMoreMovies = () => {
    if (!isLoading) setPage(prev => prev + 1);
  };

  const searchMovies = async () => {
    if (query.trim().length === 0) {
      setSearchResults([]);
      setSearchPage(1);
      return;
    }
    setSearchLoading(true);
    const results = await fetchSearchMovies(query, 1);
    setSearchResults(results);
    setSearchLoading(false);
    setSearchPage(1);
  };

  const loadMoreSearchResults = async () => {
    if (searchLoading) {
      return;
    }
    if (query.trim().length === 0) {
      return;
    }

    setSearchLoading(true);
    const nextPage = searchPage + 1;
    const results = await fetchSearchMovies(query, nextPage);
    setSearchResults(prev => [...prev, ...results]);
    setSearchPage(nextPage);
    setSearchLoading(false);
  };

  const filteredMovies = useMemo(() => {
    return movies.filter(movie => {
      const matchGenre = genreFilter
        ? movie.genre_ids?.includes(genreFilter)
        : true;
      const matchRating = ratingFilter
        ? (movie.vote_average ?? 0) >= ratingFilter
        : true;
      return matchGenre && matchRating;
    });
  }, [movies, genreFilter, ratingFilter]);

  return (
    <MovieContext.Provider
      value={{
        movies,
        isLoading,
        loadMoreMovies,
        refreshMovies,
        searchMovies,
        searchResults,
        searchLoading,
        query,
        setQuery,
        clearSearch: () => setSearchResults([]),
        genres,
        genreFilter,
        setGenreFilter,
        ratingFilter,
        setRatingFilter,
        filteredMovies,
        searchPage,
        loadMoreSearchResults,
      }}>
      {children}
    </MovieContext.Provider>
  );
};

export const useMovies = () => useContext(MovieContext);
