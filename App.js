import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { getUserSession } from './src/services/AsyncStorageService';
import { setUserSession } from './src/services/AsyncStorageService';
import AppNavigator from './src/navigation/AppNavigator';
import auth from './src/services/firebaseConfig'



const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);


  useEffect(() => {
    const checkLoginStatus = async () => {
      const storedUser = await getUserSession();
      if (storedUser) {
        setUser(storedUser);
        setIsLoading(false);
      } else {
        auth.onAuthStateChanged(async (user) => {
          if (user) {
            setUser(user);
            await setUserSession(user);
          }
          setIsLoading(false);
        });
      }
    };
    checkLoginStatus();
  }, []);



  return <AppNavigator />;
};

export default App;
