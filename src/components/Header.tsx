import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { useHeader } from '../state/Headercontext';
import colors from '../theme/colors';

const Header = () => {
  const { title } = useHeader();

  return (
    <View style={[styles.header, { paddingTop: StatusBar.currentHeight ?? 0 }]}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.black,
    paddingBottom: 15,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: colors.darkRed,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
  },
  title: {
    color: colors.red,
    fontSize: 24,
    fontWeight: 'bold',
  },
});
