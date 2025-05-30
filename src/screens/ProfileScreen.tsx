import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Alert,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {auth} from '../firebase/config';
import {useHeader, HeaderProvider} from '../state/Headercontext';
import Header from '../components/Header';
import colors from '../theme/colors';
import ProfileButton from '../components/ProfileButtons';
import {EmailAuthProvider, reauthenticateWithCredential} from 'firebase/auth';

const ProfileScreenContent = () => {
  const {setTitle} = useHeader();

  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [password, setPassword] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    setTitle('Movie Library');
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      Alert.alert('Logout Hatası', 'Çıkış yapılamadı.');
    }
  };

  const handleDeleteAccount = async () => {
    if (!password) {
      Alert.alert('Hata', 'Lütfen şifrenizi girin.');
      return;
    }
    setIsDeleting(true);
    const user = auth.currentUser;

    if (user && user.email) {
      const credential = EmailAuthProvider.credential(user.email, password);

      try {
        await reauthenticateWithCredential(user, credential);
        await user.delete();
        Alert.alert('Başarılı', 'Hesabınız silindi.');
      } catch (error: any) {
        Alert.alert('Hata', 'Şifre hatalı veya hesap silinemedi.');
      }
    }
    setIsDeleting(false);
  };

  return (
    <React.Fragment>
      <Header />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.container}
      >
        <View style={styles.profileHeader}>
          <Ionicons name="person-circle-outline" size={100} color="#fff" />
          <Text style={styles.title}>{auth.currentUser?.email}</Text>
        </View>

        <ProfileButton
          title="Logout"
          iconName="exit-outline"
          onPress={handleLogout}
        />

        {!showPasswordInput ? (
          <ProfileButton
            title="Delete Account"
            iconName="trash-outline"
            onPress={() => setShowPasswordInput(true)}
            variant="delete"
          />
        ) : (
          <>
            <TextInput
              style={styles.input}
              placeholder="Şifrenizi girin"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              editable={!isDeleting}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <ProfileButton
              title={isDeleting ? 'Siliniyor...' : 'Hesabı Sil'}
              onPress={handleDeleteAccount}
              variant="delete"
              style={{opacity: isDeleting ? 0.7 : 1}}
            />
            <ProfileButton
              title="İptal"
              onPress={() => {
                setShowPasswordInput(false);
                setPassword('');
              }}
            />
          </>
        )}
      </KeyboardAvoidingView>
    </React.Fragment>
  );
};

const ProfileScreen = () => {
  return (
    <HeaderProvider>
      <ProfileScreenContent />
    </HeaderProvider>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkRed,
    padding: 30,
    justifyContent: 'center',
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 50,
  },
  title: {
    marginTop: 15,
    fontSize: 22,
    fontWeight: '600',
    color: colors.yellow,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginVertical: 15,
    backgroundColor: '#fff',
    color: '#000',
  },
});
