import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useMovies} from '../state/MovieContext';
import DynamicImage from '../state/ImageContext';
import SearchFilterToggles from '../components/SearchFilterTogglesButton';
import styles from '../styles/SearchStyles';

type RootStackParamList = {
  Details: {movie: any};
};

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w200';

const SearchScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const {
    movies,
    query,
    setQuery,
    searchLoading,
    searchMovies,
    genres,
    genreFilter,
    setGenreFilter,
    ratingFilter,
    setRatingFilter,
    searchResults,
    loadMoreMovies,
  } = useMovies();

  const [showSearch, setShowSearch] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [searched, setSearched] = useState(false);
  const [filterLoading, setFilterLoading] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      setQuery('');
      setSearched(false);
    }, [setQuery]),
  );

  useEffect(() => {
    if (query.trim().length > 0) {
      searchMovies();
      setSearched(true);
    } else {
      setSearched(false);
    }
  }, [query]);

  useEffect(() => {
    setFilterLoading(true);
    const timer = setTimeout(() => {
      setFilterLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [query, genreFilter, ratingFilter]);

  const filteredMovies = (searched ? searchResults : movies).filter(movie => {
    const genreMatch =
      genreFilter === null ||
      (Array.isArray(movie.genre_ids) && movie.genre_ids.includes(genreFilter));
    const ratingMatch =
      ratingFilter === null ||
      (movie.vote_average && movie.vote_average >= ratingFilter);
    return genreMatch && ratingMatch;
  });

  const renderMovieItem = ({item}: {item: any}) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('Details', {movie: item})}>
      {item.poster_path ? (
        <DynamicImage
          width={100}
          uri={`${IMAGE_BASE_URL}${item.poster_path}`}
        />
      ) : (
        <Text>No image</Text>
      )}
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>
          {item.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}>
      <SearchFilterToggles
        showSearch={showSearch}
        setShowSearch={setShowSearch}
        showFilters={showFilters}
        setShowFilters={setShowFilters}
      />

      {showSearch && (
        <View style={styles.searchContainer}>
          <TextInput
            placeholder="Search movies..."
            style={styles.searchInput}
            value={query}
            onChangeText={setQuery}
            returnKeyType="search"
          />
        </View>
      )}

      {showFilters && (
        <View style={styles.filterContainer}>
          <Text style={styles.filterTitle}>Genre</Text>
          <FlatList
            horizontal
            data={[{id: null, name: 'All'}, ...genres]}
            keyExtractor={item =>
              item.id === null ? 'all' : item.id.toString()
            }
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => (
              <TouchableOpacity
                style={[
                  styles.genreButton,
                  genreFilter === item.id && styles.genreButtonActive,
                ]}
                onPress={() =>
                  setGenreFilter(genreFilter === item.id ? null : item.id)
                }>
                <Text
                  style={[
                    styles.genreButtonText,
                    genreFilter === item.id && styles.genreButtonTextActive,
                  ]}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            )}
          />

          <Text style={styles.filterTitle}>Rating</Text>
          <FlatList
            data={[null, 5, 6, 7, 8, 9]}
            horizontal
            keyExtractor={(item) =>
              item === null ? 'all' : item.toString()
            }
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{paddingVertical: 8}}
            renderItem={({item}) => {
              const isSelected = item === ratingFilter;
              return (
                <TouchableOpacity
                  style={[
                    styles.filterOption,
                    item === null && !ratingFilter && styles.selectedFilter,
                    isSelected && styles.selectedFilter,
                  ]}
                  onPress={() =>
                    setRatingFilter(item === ratingFilter ? null : item)
                  }>
                  <Text
                    style={[
                      styles.filterText,
                      (item === null && !ratingFilter) || isSelected
                        ? styles.selectedFilterText
                        : null,
                    ]}>
                    {item === null ? 'All' : `${item}+`}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      )}

      {searchLoading && (
        <ActivityIndicator style={{marginTop: 20}} size="large" />
      )}
      {!searchLoading && filterLoading && (
        <ActivityIndicator style={{marginTop: 20}} size="large" />
      )}
      {!searchLoading &&
        !filterLoading &&
        searched &&
        filteredMovies.length === 0 && (
          <Text style={styles.noResultsText}>
            Kriterlere uygun film bulunamadı.
          </Text>
        )}

      {!searchLoading && !filterLoading && filteredMovies.length > 0 && (
        <FlatList
          data={Array.from(
            new Map(filteredMovies.map(movie => [movie.id, movie])).values(),
          )}
          keyExtractor={item => item.id.toString()}
          renderItem={renderMovieItem}
          numColumns={2}
          columnWrapperStyle={{justifyContent: 'space-between'}}
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
          onEndReached={() => {
            if (!searchLoading) {
              loadMoreMovies();
            }
          }}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
        />
      )}
    </KeyboardAvoidingView>
  );
};



export default SearchScreen;
