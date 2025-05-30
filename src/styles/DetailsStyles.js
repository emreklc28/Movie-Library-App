import { StyleSheet } from 'react-native';
import colors from '../theme/colors';


const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: colors.black,
  },
  center: {
    flex: 1,
    backgroundColor: colors.black,
    justifyContent: 'center',
    alignItems: 'center',
  },
  descriptionContainer: {
    marginTop: 8,
    maxHeight: 120,
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: colors.darkGrey,
  },
  posterContainer: {
    flex: 1,
    width: '100%',
    height: 400,
    borderRadius: 8,
    overflow: 'hidden',
  },
  poster: {
    width: '100%',
    height: '100%',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    justifyContent: 'space-between',
  },
  ratingYear: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.white,
  },
  sectionTitle: {
    marginTop: 16,
    fontSize: 20,
    fontWeight: '600',
    color: colors.white,
  },
  description: {
    fontSize: 16,
    lineHeight: 22,
    color: colors.white,
  },
  castItem: {
    width: 100,
    flex: 1,
    marginRight: 12,
    alignItems: 'center',
  },
  castImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.yellow,
  },
  noImage: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  castName: {
    marginTop: 6,
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
    color: colors.white,
  },
  castCharacter: {
    fontStyle: 'italic',
    fontSize: 12,
    textAlign: 'center',
    color: colors.white,
  },
  genreContainer: {
    marginTop: 12,
  },
  genresTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    color: colors.white,
  },
  genresList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  genreBadge: {
    backgroundColor: colors.red,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  genreText: {
    color: colors.white,
    fontWeight: '600',
    fontSize: 14,
  },

  safeProvier: {
    flex: 1,
    backgroundColor: colors.black,
  },
});

export default styles;
