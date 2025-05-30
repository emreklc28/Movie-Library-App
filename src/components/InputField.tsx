import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../theme/colors';

type Props = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?: 'default' | 'numeric' | 'email-address';
  placeholder: string;
  secureTextEntry?: boolean;
  iconName?: string;
};

export default function InputField({
  label,
  value,
  onChangeText,
  keyboardType,
  placeholder,
  secureTextEntry,
  iconName,
}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        {iconName && (
          <Ionicons
            name={iconName}
            size={22}
            color={colors.red}
            style={styles.icon}
          />
        )}
        <TextInput
          style={styles.input}
          value={value}
          secureTextEntry={secureTextEntry}
          placeholder={placeholder}
          placeholderTextColor="#aaa"
          onChangeText={onChangeText}
          keyboardType={keyboardType || 'default'}
          selectionColor={colors.red}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#ddd',
    fontWeight: '600',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1f1f1f',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: '#333',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
    elevation: 3,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: colors.white,
  },
});
