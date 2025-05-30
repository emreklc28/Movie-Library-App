import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useMovies} from '../state/MovieContext';
import {useHeader, HeaderProvider} from '../state/Headercontext';
import Header from '../components/Header';
import DynamicImage from '../state/ImageContext';
import colors from '../theme/colors';

type RootStackParamList = {
  Details: {movie: any};
};

const HomeScreen = () => {
  const {movies, isLoading, loadMoreMovies, refreshMovies} = useMovies();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [refreshing, setRefreshing] = useState(false);
  const {setTitle} = useHeader();

  useEffect(() => {
    setTitle('Movie Library');
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await refreshMovies();
    setRefreshing(false);
  };

  if (isLoading && movies.length === 0) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={colors.red} />
      </View>
    );
  }

  const renderItem = ({item}: any) => {
    const releaseYear = item.release_date
      ? item.release_date.split('-')[0]
      : 'Unknown';

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('Details', {movie: item})}>
        <View>
          <DynamicImage
            width={100}
            uri={`https://image.tmdb.org/t/p/w200${item.poster_path}`}
          />
        </View>
        <View style={styles.info}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.year}>{releaseYear}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <React.Fragment>
      <Header />
      <FlatList
        data={Array.from(
          new Map(movies.map(movie => [movie.id, movie])).values(),
        )}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.container}
        renderItem={renderItem}
        onEndReached={loadMoreMovies}
        onEndReachedThreshold={0.5}
        refreshing={refreshing}
        onRefresh={onRefresh}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={
          isLoading ? (
            <ActivityIndicator
              size="small"
              color={colors.red}
              style={styles.footerLoader}
            />
          ) : null
        }
      />
    </React.Fragment>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.red,
  },
  container: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: colors.black,
  },
  footerLoader: {
    marginVertical: 16,
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
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.paleYellow,
    marginBottom: 8,
    flexWrap: 'wrap',
  },
  year: {
    fontSize: 14,
    color: colors.paleYellow,
  },
});
