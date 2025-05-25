
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCtBMikc0PTqooYQiU-8gRkkr2cbOxzko8',
  authDomain: 'movieapp-d6faf.firebaseapp.com',
  projectId: 'movieapp-d6faf',
  storageBucket: 'movieapp-d6faf.appspot.com',
  messagingSenderId: '869490750526',
  appId: '1:869490750526:web:4eda4461382274434e8d6f',
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);