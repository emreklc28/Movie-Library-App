import React, {useState, useMemo} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import {useFavorites} from '../state/FavContext';
import {useMovies} from '../state/MovieContext';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import DynamicImage from '../state/ImageContext';
import SearchFilterToggles from '../components/SearchFilterTogglesButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../theme/colors';
import styles from '../styles/FavStyles';

type RootStackParamList = {
  Details: {movie: any};
};

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const FavScreen = () => {
  const {favorites, toggleFavorite, isFavorite} = useFavorites();
  const {genres} = useMovies();

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [genreFilter, setGenreFilter] = useState<number | null>(null);
  const [ratingFilter, setRatingFilter] = useState<number | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchText, setSearchText] = useState('');

  const filteredFavorites = useMemo(() => {
    return favorites.filter(movie => {
      const genreMatch =
        genreFilter === null ||
        (Array.isArray(movie.genre_ids) &&
          movie.genre_ids.includes(genreFilter));

      const ratingMatch =
        ratingFilter === null ||
        (movie.vote_average && movie.vote_average >= ratingFilter);

      const searchMatch = movie.title
        .toLowerCase()
        .includes(searchText.toLowerCase());

      return genreMatch && ratingMatch && searchMatch;
    });
  }, [favorites, genreFilter, ratingFilter, searchText]);

  if (!favorites || !genres) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text>Loading favorites...</Text>
      </View>
    );
  }

  if (favorites.length === 0) {
    return (
      <View style={styles.center}>
        <Text>No favorite movies yet.</Text>
      </View>
    );
  }

  return (
    <React.Fragment>
      <StatusBar barStyle="light-content" backgroundColor={'#000'} />
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}>
        <View style={styles.containerMain}>
          <SearchFilterToggles
            showSearch={showSearchBar}
            setShowSearch={setShowSearchBar}
            showFilters={showFilters}
            setShowFilters={setShowFilters}
          />

          {showSearchBar && (
            <View style={styles.searchContainer}>
              <TextInput
                placeholder="Search favorite movies..."
                placeholderTextColor={colors.black}
                style={styles.searchInput}
                value={searchText}
                onChangeText={setSearchText}
              />
            </View>
          )}

          {showFilters && (
            <View style={styles.filterContainer}>
              <Text style={styles.filterTitle}>Genre</Text>
              <FlatList
                horizontal
                data={[{id: null, name: 'All'}, ...genres]}
                keyExtractor={item => item.id?.toString() ?? 'all'}
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
                        genreFilter === item.id &&
                          styles.genreButtonTextActive,
                      ]}>
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                )}
              />

              <Text style={styles.filterTitle}>Rating</Text>
              <FlatList
                horizontal
                data={[null, 5, 6, 7, 8, 9]}
                keyExtractor={item => (item === null ? 'all' : item.toString())}
                showsHorizontalScrollIndicator={false}
                renderItem={({item}) => (
                  <TouchableOpacity
                    style={[
                      styles.filterOption,
                      ratingFilter === item && styles.selectedFilter,
                    ]}
                    onPress={() =>
                      setRatingFilter(ratingFilter === item ? null : item)
                    }>
                    <Text
                      style={[
                        ratingFilter === item && styles.selectedFilterText,
                      ]}>
                      {item === null ? 'All' : `${item}+`}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          )}

          {filteredFavorites.length === 0 ? (
            <View style={[styles.center, {backgroundColor: colors.black}]}>
              <Text style={styles.nNFountFav}>
                No favorite movies found matching your search
              </Text>
            </View>
          ) : (
            <FlatList
              data={filteredFavorites}
              keyExtractor={item => item.id.toString()}
              contentContainerStyle={styles.listContentContainer}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={styles.card}
                  onPress={() => navigation.navigate('Details', {movie: item})}>
                  <DynamicImage
                    width={100}
                    uri={`${IMAGE_BASE_URL}${item.poster_path}`}
                  />
                  <View style={styles.info}>
                    <Text style={styles.title}>{item.title}</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() =>
                      toggleFavorite({
                        ...item,
                        genre_ids: item.genre_ids || [],
                      })
                    }
                    style={{
                      padding: 8,
                      position: 'absolute',
                      right: 10,
                      top: 10,
                    }}>
                    <Ionicons
                      name={isFavorite(item.id) ? 'heart' : 'heart-outline'}
                      size={24}
                      color={isFavorite(item.id) ? 'red' : 'gray'}
                    />
                  </TouchableOpacity>
                </TouchableOpacity>
              )}
            />
          )}
        </View>
      </KeyboardAvoidingView>
    </React.Fragment>
  );
};



export default FavScreen;
