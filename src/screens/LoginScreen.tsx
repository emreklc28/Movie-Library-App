import React, {useState} from 'react';
import {View, Text, Alert, StyleSheet} from 'react-native';
import {signInWithEmailAndPassword} from 'firebase/auth';
import Button from '../components/Button';
import InputField from '../components/InputField';
import {auth} from '../firebase/config';
import {useNavigation} from '@react-navigation/native';
import colors from '../theme/colors';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation<any>();

  const isValidEmail = () => {
    return email.includes('@') && email.includes('.');
  };

  const handleLogin = async () => {
    if (!email.trim()) {
      Alert.alert('Hata', 'Email alanı boş bırakılamaz.');
      return;
    }
    if (!password.trim()) {
      Alert.alert('Hata', 'Şifre alanı boş bırakılamaz.');
      return;
    }

    if (!isValidEmail()) {
      Alert.alert(
        'Hata',
        'Lütfen geçerli bir email adresi girin (örneğin: kullanici@ornek.com).',
      );
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      Alert.alert(
        'Giriş Başarısız',
        'Hatalı kullanıcı veya şifre hatalı',
      );
    }
  };

  return (
    <View style={styles.container}>
      <InputField
        label="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        placeholder="E-mail Giriniz"
      />
      <InputField
        label="Password"
        placeholder="Şifre Giriniz"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
        keyboardType="default"
      />
      <Button title="Login" onPress={handleLogin} />
      <Text
        onPress={() => navigation.navigate('Register')}
        style={styles.registerText}>
        Hesabınız yok mu? Kayıt Olun
      </Text>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
    justifyContent: 'center',
  },
  registerText: {
    marginTop: 20,
    fontSize: 25,
    color: colors.red,
    textAlign: 'center',
  },
});
