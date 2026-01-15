import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from  'expo-notifications';
import { format } from 'date-fns';


export interface PlantProps {
    id: string;
    name: string;
    about: string;
    water_tips: string;
    photo: string;
    environments: [string];
    frequency: {
      times: number;
      repeat_every: string;
    };
    hour: string;
    dateTimeNotification: Date;
}

export interface StoragePlantProps {
    [id: string]: {
        data: PlantProps;
        notificationId: string;
    }
}

export async function savePlant(plant: PlantProps): Promise<void>{

    try {
        const nexTime =  new Date(plant.dateTimeNotification);
        const now = new Date();

        const { times, repeat_every} = plant.frequency;
        if(repeat_every === 'week'){
          const interval = Math.trunc(7 / times)
          nexTime.setDate(now.getDate() + interval);
        // } else {
        //   nexTime.setDate(nexTime.getDate() + 1);
        }

        const seconds = Math.abs(
          Math.ceil(now.getTime() - nexTime.getTime() / 1000 )
        );

        const notificationId = await Notifications.scheduleNotificationAsync({
          content: {
              title: 'Heeey, 🌱',
              body: `Está na hora de cuidar da sua ${plant.name}`,
              sound: true,
              priority: Notifications.AndroidNotificationPriority.HIGH,
              data: {
                  plant
              },
          },
          trigger: {
            type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
            seconds: seconds < 60 ? 60 : seconds,
            repeats: true
          },
        });

        const data = await AsyncStorage.getItem('@plantmanager:plants');
        const oldPlants =  data ? (JSON.parse(data) as StoragePlantProps) : {};

        const newPlant = {
            [plant.id]: {
                data: plant,
                notificationId
            }
        }

        await AsyncStorage.setItem('@plantmanager:plants',
            JSON.stringify({
              //pega o que ja tinha e adiciona o novo no velho  
                ...newPlant,
                ...oldPlants
            })
        );

    } catch(error){
        console.log(error);
    }
}

export async function loadPlant(){
  try {
    const data = await AsyncStorage.getItem('@plantmanager:plants');
    const plants = data ? (JSON.parse(data) as StoragePlantProps) : {};
    //Abre plants e pega a planta dentro 
    const plantsShorted = Object
    .keys(plants)
    .map((plant) => {
      return {
        /** 
         * seleciona a Plant dentro da coleção Plants,  
         * por cada chave que ele percorre usando o maps 
         * ele adiciona Hour ja formatado
         */
        //
        ...plants[plant].data,
        hour: format(new Date(plants[plant].data.dateTimeNotification), 'HH:mm')
        
      }
    })
    .sort((a ,b) => 
      Math.floor(
        new Date(a.dateTimeNotification).getTime() / 1000 -
        Math.floor(new Date(b.dateTimeNotification).getTime() / 1000)
      )
    );

    return plantsShorted;

  } catch (error) {
    // throw new Error(error);
    console.log(error);
  }
}

export async function removePlant(id: string): Promise<void> {
  const data = await AsyncStorage.getItem('@plantmanager:plants');
  const plants = data ? (JSON.parse(data) as StoragePlantProps) : {};

  delete plants[id];

  await AsyncStorage.setItem(
      '@plantmanager:plants',
      JSON.stringify(plants)
  );
}

