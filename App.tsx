import React from 'react';
import { StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components';
import AppLoading from 'expo-app-loading';
import theme from './src/global/styles/theme';
import Routes from './src/routes';
import 'react-native-gesture-handler';
import { AuthProvider } from './src/hooks/auth';

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold
} from '@expo-google-fonts/poppins';

const App: React.FC = () => {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
  });

  if (!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <>
      <StatusBar translucent backgroundColor="black" barStyle={'light-content'} />
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </ThemeProvider>
    </>
  );
};

export default App;
