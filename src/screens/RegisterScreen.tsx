import React, { useState } from 'react';
import { View, Alert, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../firebase/config';
import Button from '../components/Button';
import InputField from '../components/InputField';
import colors from '../theme/colors';

const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation<any>();

  const isValidEmail = (email: string) => {
    return email.includes('@') && email.includes('.');
  };

  const handleRegister = async () => {
    if (!email.trim()) {
      Alert.alert('Hata', 'Email alanı boş bırakılamaz.');
      return;
    }
    if (!password.trim()) {
      Alert.alert('Hata', 'Şifre alanı boş bırakılamaz.');
      return;
    }

    if (!isValidEmail(email)) {
      Alert.alert('Hata', 'Lütfen geçerli bir email adresi girin (örneğin: kullanici@ornek.com).');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Hata', 'Şifre en az 6 karakter olmalıdır.');
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigation.navigate('Login');
    } catch (error: any) {
      Alert.alert('Kayıt Başarısız', 'Kullanıcı Adı Alınmış');
    }
  };

  return (
    <View style={styles.container}>
      <InputField
        label="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        placeholder="E-mail adresinizi giriniz!"
      />
      <InputField
        label="Password"
        placeholder="Şifre Giriniz"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
        keyboardType="default"
      />
      <Button title="Register" onPress={handleRegister} />

      <View style={styles.loginTextContainer}>
        <Text style={styles.text}>Zaten hesabınız var mı? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginText}>Giriş Yap</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor:colors.black,
    flex: 1,
    justifyContent: 'center',
  },
  loginTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  loginText: {
    color: colors.white,
    fontWeight: 'bold',
  },
  text:{
    color:colors.red,

  },
});
