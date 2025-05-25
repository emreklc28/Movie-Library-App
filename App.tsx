import React, {useEffect, useState} from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';

import {auth} from './src/firebase/config';
import {FavProvider} from './src/state/FavContext';
import {MovieProvider} from './src/state/MovieContext';

import AppNavigator from './src/navigation/AppNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const App = () => {
  const [user, setUser] = useState<any>(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(authUser => {
      setUser(authUser);
      setInitializing(false);
    });

    return unsubscribe;
  }, []);

  if (initializing) {
    return (
      <View style={style.initializing}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
    <MovieProvider>
      <FavProvider>
        <AppNavigator user={user} />
      </FavProvider>
    </MovieProvider>
    </SafeAreaProvider>
  );
};

export default App;

const style = StyleSheet.create({
  initializing:{
    flex: 1,
      justifyContent: 'center',
       alignItems: 'center',
  },


});


