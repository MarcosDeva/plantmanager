import { useEffect } from 'react';
import { 
  Jost_400Regular, 
  Jost_600SemiBold, 
  useFonts
}  from '@expo-google-fonts/jost';
import * as SplashScreen from 'expo-splash-screen';
import Routes from './src/routes';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [loaded, error] = useFonts({
      Jost_400Regular, 
      Jost_600SemiBold,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <Routes />
  )
}
