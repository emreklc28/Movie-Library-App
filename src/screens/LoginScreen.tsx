import React, {useState} from 'react';
import {
  View,
  Text,
  Alert,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
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

  const isValidEmail = () =>{
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
      Alert.alert('Giriş Başarısız', 'Hatalı email veya şifre');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Giriş Yap</Text>

        <InputField
          label="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          placeholder="E-mail adresinizi girin"
          iconName="mail-outline"
        />

        <InputField
          label="Şifre"
          placeholder="Şifrenizi girin"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          iconName="lock-closed-outline"
        />

        <Button title="Giriş Yap" onPress={handleLogin} />

        <View style={styles.registerTextContainer}>
          <Text style={styles.text}>Hesabınız yok mu? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.registerText}>Kayıt Olun</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkRed,
    justifyContent: 'center',
  },
  innerContainer: {
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 32,
    color: colors.white,
    fontWeight: 'bold',
    marginBottom: 24,
    alignSelf: 'center',
  },
  registerTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  text: {
    fontSize: 16,
    color: '#ccc',
  },
  registerText: {
    fontSize: 16,
    color: colors.red,
    fontWeight: '600',
  },
});
