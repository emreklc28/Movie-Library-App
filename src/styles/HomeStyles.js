import { StyleSheet } from 'react-native';
import colors from '../theme/colors';

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
    shadowOffset: { width: 0, height: 3 },
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

export default styles;
