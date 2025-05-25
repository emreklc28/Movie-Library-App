import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import colors from '../theme/colors';


type Props = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?: 'default' | 'numeric' | 'email-address';
  placeholder: string;
  secureTextEntry?: boolean;
};

export default function InputField({
  label,
  value,
  onChangeText,
  keyboardType,
  placeholder,
  secureTextEntry,
}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        placeholderTextColor={colors.red}
        onChangeText={onChangeText}
        keyboardType={keyboardType || 'default'}
        selectionColor={colors.red}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    marginBottom: 4,
    color:colors.red,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: colors.red,
    padding: 10,
    borderRadius: 6,
    backgroundColor:colors.black,
    color:colors.white,
  },
});
