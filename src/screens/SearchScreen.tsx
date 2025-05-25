import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useMovies} from '../state/MovieContext';
import DynamicImage from '../state/ImageContext';
import colors from '../theme/colors';
import SearchFilterToggles from '../components/SearchFilterTogglesButton';

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
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
    >
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
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <TouchableOpacity
              style={[
                styles.genreButton,
                genreFilter === null && styles.genreButtonActive,
              ]}
              onPress={() => setGenreFilter(null)}>
              <Text
                style={[
                  styles.genreButtonText,
                  genreFilter === null && styles.genreButtonTextActive,
                ]}>
                All
              </Text>
            </TouchableOpacity>
            {genres.map(genre => (
              <TouchableOpacity
                key={genre.id}
                style={[
                  styles.genreButton,
                  genreFilter === genre.id && styles.genreButtonActive,
                ]}
                onPress={() =>
                  setGenreFilter(genreFilter === genre.id ? null : genre.id)
                }>
                <Text
                  style={[
                    styles.genreButtonText,
                    genreFilter === genre.id && styles.genreButtonTextActive,
                  ]}>
                  {genre.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <Text style={styles.filterTitle}>Rating</Text>
          <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
            <TouchableOpacity
              style={[
                styles.filterOption,
                ratingFilter === null && styles.selectedFilter,
              ]}
              onPress={() => setRatingFilter(null)}>
              <Text
                style={[
                  styles.filterText,
                  ratingFilter === null && styles.selectedFilterText,
                ]}>
                All
              </Text>
            </TouchableOpacity>
            {[5, 6, 7, 8, 9].map(rating => (
              <TouchableOpacity
                key={rating}
                style={[
                  styles.filterOption,
                  ratingFilter === rating && styles.selectedFilter,
                ]}
                onPress={() =>
                  setRatingFilter(ratingFilter === rating ? null : rating)
                }>
                <Text
                  style={[
                    styles.filterText,
                    ratingFilter === rating && styles.selectedFilterText,
                  ]}>
                  {rating}+
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
      {searchLoading && (
        <ActivityIndicator style={{marginTop: 20}} size="large" />
      )}
      {!searchLoading && filterLoading && (
        <ActivityIndicator style={{marginTop: 20}} size="large" />
      )}
      {!searchLoading && !filterLoading && searched && filteredMovies.length === 0 && (
        <Text style={styles.noResultsText}>Kriterlere uygun film bulunamadı.</Text>
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

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.black,
    flex: 1,
  },
  container: {
    marginTop: 10,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  searchContainer: {
    paddingHorizontal: 16,
    marginVertical: 20,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: colors.yellow,
    color: colors.red,
    fontSize: 16,
  },
  filterContainer: {
    paddingHorizontal: 16,
    borderRadius: 12,
    padding: 16,
  },
  filterTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: colors.white,
    marginBottom: 6,
  },
  genreButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: colors.yellow,
    marginRight: 8,
    marginBottom: 8,
  },
  genreButtonActive: {
    backgroundColor: colors.red,
    fontWeight: 'bold',
  },
  genreButtonText: {
    color: colors.red,
    fontSize: 14,
    fontWeight: 'bold',
  },
  genreButtonTextActive: {
    color: colors.black,
    fontWeight: 'bold',
  },
  filterOption: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: colors.yellow,
    marginRight: 8,
    marginBottom: 8,
  },
  selectedFilter: {
    backgroundColor: colors.red,
  },
  filterText: {
    color: colors.red,
    fontSize: 14,
  },
  selectedFilterText: {
    color: colors.black,
    fontWeight: 'bold',
  },
  card: {
    flex: 1,
    margin: 8,
    backgroundColor: colors.darkGrey,
    borderRadius: 12,
    overflow: 'hidden',
    alignItems: 'center',
  },
  info: {
    padding: 12,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.yellow,
  },
  noResultsText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: colors.yellow,
  },
});

export default SearchScreen;
