import React, { createContext, useContext, useState, useEffect } from 'react';
import { db, auth } from '../firebase/config';
import { collection, doc, setDoc, deleteDoc, onSnapshot } from 'firebase/firestore';

type Movie = {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  overview: string;
  genre_ids?: number[];
};

type FavContextType = {
  favorites: Movie[];
  toggleFavorite: (movie: Movie) => Promise<void>;
  isFavorite: (movieId: number) => boolean;
};

const FavContext = createContext<FavContextType>({
  favorites: [],
  toggleFavorite: async () => {},
  isFavorite: () => false,
});

export const FavProvider = ({ children }: { children: React.ReactNode }) => {
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    let unsubscribeFirestore: () => void = () => {};

    if (userId) {
      const favoritesCollectionRef = collection(db, 'users', userId, 'favorites');

      unsubscribeFirestore = onSnapshot(favoritesCollectionRef, (snapshot) => {
        const initialFavorites: Movie[] = [];
        snapshot.forEach((doc) => {
          initialFavorites.push(doc.data() as Movie);
        });
        setFavorites(initialFavorites);
      });
    } else {
      setFavorites([]);
    }

    return () => unsubscribeFirestore();
  }, [userId]);

  const toggleFavorite = async (movie: Movie) => {
    const userId = auth.currentUser?.uid;

    if (userId) {
      const movieDocRef = doc(db, 'users', userId, 'favorites', String(movie.id));
      const isCurrentlyFavorite = favorites.some((fav) => fav.id === movie.id);

      try {
        if (isCurrentlyFavorite) {
          await deleteDoc(movieDocRef);
        } else {
          await setDoc(movieDocRef, movie);
        }
      } catch (error) {
        console.error('Favori durumu güncellenirken bir hata oluştu:', error);
      }
    }
  };

  const isFavorite = (movieId: number) => {
    return favorites.some((m) => m.id === movieId);
  };

  return (
    <FavContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavContext.Provider>
  );
};

export const useFavorites = () => useContext(FavContext);