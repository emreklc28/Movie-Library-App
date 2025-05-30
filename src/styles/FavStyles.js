import { StyleSheet } from 'react-native';
import colors from '../theme/colors';

const styles = StyleSheet.create({
  containerMain: {
    flex: 1,
    backgroundColor: colors,
  },
  listContentContainer: {
    paddingHorizontal: 16,
    marginTop: 10,
  },
  center: {
    backgroundColor: colors.paleYellow,
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
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: colors.brightYellow,
    color: colors.black,
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
    backgroundColor: colors.cream,
    marginRight: 8,
    marginBottom: 8,
  },
  genreButtonActive: {
    backgroundColor: colors.brightYellow,
    fontWeight: 'bold',
  },
  genreButtonText: {
    color: colors.deepGray,
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
    backgroundColor: colors.cream,
    marginRight: 8,
    marginBottom: 8,
  },
  selectedFilter: {
    backgroundColor: colors.brightYellow,
  },
  selectedFilterText: {
    color: colors.black,
    fontWeight: 'bold',
  },
  nNFountFav: {
    color: colors.yellow,
    fontSize: 18,
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
    color: colors.paleYellow,
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
export default styles;
