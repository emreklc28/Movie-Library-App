import React from 'react';
import { TouchableOpacity, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../theme/colors';

type ProfileButtonProps = {
  title: string;
  onPress: () => void;
  iconName?: string;
  variant?: 'logout' | 'delete';
  style?: StyleProp<ViewStyle>;
};

const ProfileButton = ({
  title,
  onPress,
  iconName,
  variant = 'logout',
  style,
}: ProfileButtonProps) => {
  const isDelete = variant === 'delete';

  return (
    <TouchableOpacity
      style={[styles.button,style]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Ionicons
        name={iconName}
        size={24}
        style={[styles.icon, isDelete && styles.deleteIcon]}
      />
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default ProfileButton;

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#ff3333',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginVertical: 12,
  },
  icon: {
    marginRight: 10,
    color: colors.red,
  },
  deleteIcon: {
    color: colors.red,
  },
  buttonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '600',
  },
});
