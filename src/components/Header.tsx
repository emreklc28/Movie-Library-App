import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {useHeader} from '../state/Headercontext';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../theme/colors';

type HeaderProps = {
  showBackButton?: boolean;
};

const Header = ({showBackButton = false}: HeaderProps) => {
  const {title} = useHeader();
  const navigation = useNavigation();

  return (
    <View style={[styles.header, {paddingTop: StatusBar.currentHeight ?? 0}]}>
      {showBackButton ? (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
          hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
          <Ionicons name="arrow-back" size={28} color={colors.red} />
        </TouchableOpacity>
      ) : (
        <View style={{width: 44}} />
      )}
      <Text
        style={styles.title}
        numberOfLines={1}
        ellipsizeMode="tail"
        adjustsFontSizeToFit>
        {title}
      </Text>
      <View style={{width: 44}} />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.black,
    paddingBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 4,
    shadowColor: colors.darkRed,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 3,
  },
  backButton: {
    paddingLeft: 16,
    paddingRight: 8,
  },
  title: {
    color: colors.red,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
});
