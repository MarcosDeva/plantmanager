import React, { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import * as Notifications from 'expo-notifications';

import Routes from './src/routes';
import { PlantProps } from './src/libs/storage';

import { 
  Jost_400Regular, 
  Jost_600SemiBold, 
  useFonts
}  from '@expo-google-fonts/jost';

SplashScreen.preventAutoHideAsync();

// function useNotificationObserver(){
//       const subscription = Notifications.addNotificationResponseReceivedListener( 
//         async response => {
//           const data = response.notification.request.content.data.plant as PlantProps;
//           console.log(data);
//       }
//     );
//     return () => subscription.remove();
// }

export default function App() {
  const [loaded, error] = useFonts({
      Jost_400Regular, 
      Jost_600SemiBold,
  });

  useEffect(() =>{
    const subscription = Notifications.addNotificationResponseReceivedListener( 
      async response => {
          const data = response.notification.request.content.data.plant as PlantProps;
          console.log(data);
      }
    );
    return () => subscription.remove();
  },[])

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  // useNotificationObserver();

  return (
    <Routes />
  )
}
