import axios from 'axios';

const API_KEY = '9ec34ae5c14b06643cf1786df92467a0';
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchPopularMovies = async (page = 1) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/popular`, {
      params: {
        api_key: API_KEY,
        language: 'en-US',
        page,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Popüler filmler alınamadı:', error);
    return [];
  }
};
export const fetchMovieDetails = async (movieId: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${movieId}`, {
      params: {
        api_key: API_KEY,
        language: 'en-US',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Film detayları alınamadı:', error);
    return null;
  }
};
export const fetchMovieCast = async (movieId: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${movieId}/credits`, {
      params: {
        api_key: API_KEY,
      },
    });
    return response.data.cast;
  } catch (error) {
    console.error('Oyuncu kadrosu alınamadı:', error);
    return [];
  }
};

export const fetchSearchMovies = async (query: string, page = 1) => {
  if (!query) {
  return [];
  }
  try {
    const response = await axios.get(`${BASE_URL}/search/movie`, {
      params: {
        api_key: API_KEY,
        language: 'en-US',
        query,
        page,
        include_adult: false,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Film arama başarısız:', error);
    return [];
  }
};

export const fetchGenresByGenre = async (genreId: number, page = 1) => {
  try {
    const response = await axios.get(`${BASE_URL}/discover/movie`, {
      params: {
        api_key: API_KEY,
        language: 'en-US',
        with_genres: genreId,
        page,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Tür filtresine göre filmler alınamadı:', error);
    return [];
  }
};

export const fetchMoviesByRating = async (minRating: number, page = 1) => {
  try {
    const response = await axios.get(`${BASE_URL}/discover/movie`, {
      params: {
        api_key: API_KEY,
        language: 'en-US',
        'vote_average.gte': minRating,
        page,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Oylamaya göre filmler alınamadı:', error);
    return [];
  }
};
export const fetchFilteredMovies = async ({
  genreId,
  minRating,
  page = 1,
}: {
  genreId?: number;
  minRating?: number;
  page?: number;
}) => {
  try {
    const response = await axios.get(`${BASE_URL}/discover/movie`, {
      params: {
        api_key: API_KEY,
        language: 'en-US',
        with_genres: genreId,
        'vote_average.gte': minRating,
        page,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Filtrelenmiş filmler alınamadı:', error);
    return [];
  }

};
export const fetchGenreList = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/genre/movie/list`, {
      params: {
        api_key: API_KEY,
        language: 'en-US',
      },
    });
    return response.data.genres;
  } catch (error) {
    console.error('Türler alınamadı:', error);
    return [];
  }
};

