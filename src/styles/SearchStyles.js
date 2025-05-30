import { StyleSheet } from 'react-native';
import colors from '../theme/colors';

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.darkRed,
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
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: colors.brightYellow,
    color: colors.black,
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
    backgroundColor: colors.cream,
    marginRight: 8,
    marginBottom: 8,
  },
  genreButtonActive: {
    backgroundColor:colors.brightYellow ,
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
  filterText: {
    color: colors.deepGray,
    fontSize: 14,
    fontWeight:'bold',
  },
  selectedFilterText: {
    color: colors.black,
    fontWeight: 'bold',
  },
  card: {
    flex: 1,
    margin: 8,
    backgroundColor: colors.blackishGray,
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
    color: colors.paleYellow,
  },
  noResultsText: {
    textAlign: 'center',
    color: colors.brightYellow,
    marginTop: 20,
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default styles;
