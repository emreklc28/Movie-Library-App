import React, {useEffect} from 'react';
import {View, Text, Alert, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {auth} from '../firebase/config';
import {useHeader, HeaderProvider} from '../state/Headercontext';
import Header from '../components/Header';
import colors from '../theme/colors';
import CustomButton from '../components/ProfileButtons';

const ProfileScreenContent = () => {
  const {setTitle} = useHeader();

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
    const user = auth.currentUser;
    if (user) {
      try {
        await user.delete();
        Alert.alert('Hesap Silindi', 'Hesabınız başarıyla silindi.');
      } catch (error) {
        Alert.alert('Hata', 'Hesap silinemedi.');
      }
    }
  };

  return (
    <>
      <Header />
      <View style={styles.container}>
        <View style={styles.profileHeader}>
          <Ionicons name="person-circle-outline" size={100} color="#fff" />
          <Text style={styles.title}>{auth.currentUser?.email}</Text>
        </View>

        <CustomButton
          title="Logout"
          iconName="exit-outline"
          onPress={handleLogout}
        />

        <CustomButton
          title="Delete Account"
          iconName="trash-outline"
          onPress={handleDeleteAccount}
          variant="delete"
        />
      </View>
    </>
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
});
