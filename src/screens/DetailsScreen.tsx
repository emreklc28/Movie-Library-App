import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {fetchMovieDetails, fetchMovieCast} from '../api/api';
import {useFavorites} from '../state/FavContext';
import DynamicImage from '../state/ImageContext';
import {useHeader, HeaderProvider} from '../state/Headercontext';
import Header from '../components/Header';
import styles from '../styles/DetailsStyles';

type RootStackParamList = {
  Details: {movie: {id: number}};
};

type DetailsRouteProp = RouteProp<RootStackParamList, 'Details'>;

type CastMember = {
  cast_id: number;
  character: string;
  name: string;
  profile_path: string | null;
};

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
const DOUBLE_TAP_DELAY = 300;

const CastItem = ({item}: {item: CastMember}) => (
  <View style={styles.castItem}>
    {item.profile_path ? (
      <Image
        source={{uri: `${IMAGE_BASE_URL}${item.profile_path}`}}
        style={styles.castImage}
      />
    ) : (
      <View style={[styles.castImage, styles.noImage]}>
        <Text>No Image</Text>
      </View>
    )}
    <Text style={styles.castName} numberOfLines={1}>
      {item.name}
    </Text>
    <Text style={styles.castCharacter} numberOfLines={1}>
      {item.character}
    </Text>
  </View>
);

const DetailsScreenContent = () => {
  const route = useRoute<DetailsRouteProp>();
  const {movie} = route.params;
  const screenWidth = Dimensions.get('window').width - 32;

  const [details, setDetails] = useState<any>(null);
  const [cast, setCast] = useState<CastMember[]>([]);
  const [loading, setLoading] = useState(true);

  const {toggleFavorite, isFavorite} = useFavorites();
  const {setTitle} = useHeader();

  const lastTap = useRef<number | null>(null);

  const handleDoubleTap = () => {
    if (!details) {
      return;
    }
    toggleFavorite({
      ...details,
      genre_ids: details.genres.map((genre: {id: number}) => genre.id),
    });
  };

  const onImagePress = () => {
    const now = Date.now();
    if (lastTap.current && now - lastTap.current < DOUBLE_TAP_DELAY) {
      handleDoubleTap();
    }
    lastTap.current = now;
  };

  useEffect(() => {
    const loadDetails = async () => {
      setLoading(true);
      const movieDetails = await fetchMovieDetails(movie.id);
      const movieCast = await fetchMovieCast(movie.id);
      setDetails(movieDetails);
      setCast(movieCast);
      setLoading(false);

      setTitle(movieDetails.title || 'Details');
    };
    loadDetails();
  }, [movie.id, setTitle]);

  if (loading) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  if (!details) {
    return (
      <SafeAreaView style={styles.center}>
        <Text>Film bilgisi bulunamadı.</Text>
      </SafeAreaView>
    );
  }

  const year = details.release_date
    ? details.release_date.split('-')[0]
    : 'N/A';

  return (
    <React.Fragment>
      <Header showBackButton={true} />
      <ScrollView contentContainerStyle={styles.container}>
        <DynamicImage
          uri={`${IMAGE_BASE_URL}${details.poster_path}`}
          width={screenWidth}
          onPress={onImagePress}
        />

        <View style={styles.infoRow}>
          <Text style={styles.ratingYear}>
            ⭐ {details.vote_average} / {year}
          </Text>
          <TouchableOpacity
            onPress={() =>
              toggleFavorite({
                ...details,
                genre_ids: details.genres.map(
                  (genre: {id: number}) => genre.id,
                ),
              })
            }>
            <Ionicons
              name={isFavorite(details.id) ? 'heart' : 'heart-outline'}
              size={28}
              color={isFavorite(details.id) ? 'red' : 'gray'}
            />
          </TouchableOpacity>
        </View>

        {details.genres && details.genres.length > 0 && (
          <View style={styles.genreContainer}>
            <Text style={styles.genresTitle}>Genres:</Text>
            <FlatList
              data={details.genres}
              horizontal
              keyExtractor={genre => genre.id.toString()}
              renderItem={({item}) => (
                <View style={styles.genreBadge}>
                  <Text style={styles.genreText}>{item.name}</Text>
                </View>
              )}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{paddingVertical: 4}}
            />
          </View>
        )}

        <Text style={styles.sectionTitle}>Description</Text>
        <ScrollView
          style={styles.descriptionContainer}
          contentContainerStyle={{paddingVertical: 8}}
          nestedScrollEnabled={true}
          showsVerticalScrollIndicator={true}>
          <Text style={styles.description}>
            {details.overview && details.overview.trim() !== ''
              ? details.overview
              : 'Description boş'}
          </Text>
        </ScrollView>

        <Text style={styles.sectionTitle}>Cast</Text>
        {cast.length > 0 ? (
          <FlatList
            data={cast.slice(0, 20)}
            horizontal
            keyExtractor={item => item.cast_id.toString()}
            renderItem={({item}) => <CastItem item={item} />}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{paddingVertical: 10}}
          />
        ) : (
          <Text>Cast bilgisi yok.</Text>
        )}
      </ScrollView>
    </React.Fragment>
  );
};

const DetailsScreen = () => {
  return (
    <HeaderProvider>
      <SafeAreaView style={styles.safeProvier}>
        <DetailsScreenContent />
      </SafeAreaView>
    </HeaderProvider>
  );
};



export default DetailsScreen;
