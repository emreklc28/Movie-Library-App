import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ActivityIndicator,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {useFavorites} from '../state/FavContext';
import {useMovies} from '../state/MovieContext';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import DynamicImage from '../state/ImageContext';
import SearchFilterToggles from '../components/SearchFilterTogglesButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../theme/colors';

type RootStackParamList = {
  Details: {movie: any};
};

const FavScreen = () => {
  const {favorites, toggleFavorite, isFavorite} = useFavorites();
  const {genres} = useMovies();

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [loading, setLoading] = useState(true);
  const [genreFilter, setGenreFilter] = useState<number | null>(null);
  const [ratingFilter, setRatingFilter] = useState<number | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    if (favorites && genres) {
      setLoading(false);
    }
  }, [favorites, genres]);

  if (loading) {
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

  const filteredFavorites = favorites.filter(movie => {
    const genreMatch =
      genreFilter === null ||
      (Array.isArray(movie.genre_ids) && movie.genre_ids.includes(genreFilter));

    const ratingMatch =
      ratingFilter === null ||
      (movie.vote_average && movie.vote_average >= ratingFilter);

    const searchMatch = movie.title
      .toLowerCase()
      .includes(searchText.toLowerCase());

    return genreMatch && ratingMatch && searchMatch;
  });

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={'#000'} />
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}>
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
                        genreFilter === genre.id &&
                          styles.genreButtonTextActive,
                      ]}>
                      {genre.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>

              <Text style={styles.filterTitle}>Rating</Text>
              <View style={styles.ratingContainer}>
                <TouchableOpacity
                  style={[
                    styles.filterOption,
                    ratingFilter === null && styles.selectedFilter,
                  ]}
                  onPress={() => setRatingFilter(null)}>
                  <Text
                    style={[
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
                        ratingFilter === rating && styles.selectedFilterText,
                      ]}>
                      {rating}+
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

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
                  uri={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                />
                <View style={styles.info}>
                  <Text style={styles.title}>{item.title}</Text>
                </View>
                {/* Kalp ikonu toggle ekledim */}
                <TouchableOpacity
                  onPress={() =>
                    toggleFavorite({
                      ...item,
                      genre_ids: item.genre_ids || [],
                    })
                  }
                  style={{padding: 8, position: 'absolute', right: 10, top: 10,}}>
                  <Ionicons
                    name={isFavorite(item.id) ? 'heart' : 'heart-outline'}
                    size={24}
                    color={isFavorite(item.id) ? 'red' : 'gray'}
                  />
                </TouchableOpacity>
              </TouchableOpacity>
            )}
          />
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

const styles = StyleSheet.create({
  containerMain: {
    flex: 1,
    backgroundColor: colors.black,
  },
  listContentContainer: {
    paddingHorizontal: 16,
    marginTop:10,
  },
  center: {
    backgroundColor:colors.red,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    paddingHorizontal: 16,
    marginVertical: 20,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: colors.red,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: colors.yellow,
    color: colors.red,
    fontSize: 16,
  },
  filterContainer: {
    paddingHorizontal: 16,
    marginTop: 10,
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
    fontWeight:'bold',
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

  selectedFilterText: {
    color:colors.black,
    fontWeight: 'bold',
  },
  card: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: colors.darkGrey,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: colors.red,
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  info: {
    marginLeft: 12,
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    color: colors.yellow,
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  ratingContainer:{
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export default FavScreen;
