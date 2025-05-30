import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import colors from '../theme/colors';

interface FilterToggleProps {
  showSearch: boolean;
  setShowSearch: React.Dispatch<React.SetStateAction<boolean>>;
  showFilters: boolean;
  setShowFilters: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchFilterTogglesButton: React.FC<FilterToggleProps> = ({
  showSearch,
  setShowSearch,
  showFilters,
  setShowFilters,
}) => {
  return (
    <View style={styles.buttonRow}>
      <TouchableOpacity
        style={styles.sideButton}
        onPress={() => setShowSearch(prev => !prev)}>
        <Text style={styles.filterToggleText}>
          {showSearch ? 'Hide Search' : 'Search Movie'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.sideButton}
        onPress={() => setShowFilters(prev => !prev)}>
        <Text style={styles.filterToggleText}>
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginTop: 40,
  },
  sideButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: colors.lightGray,
    borderRadius: 12,
    alignItems: 'center',
    minWidth: '40%',
  },
  filterToggleText: {
    color: colors.deepGray,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default SearchFilterTogglesButton;
