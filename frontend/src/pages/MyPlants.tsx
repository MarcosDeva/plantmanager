import React, { useEffect, useState } from 'react';
import  {
    StyleSheet,
    View,
    Text,
    Image,
    FlatList
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../components/Header';
import { PlantCardSecondary } from '../components/PlantCardSecondary';
import { loadPlant, PlantProps } from '../libs/storage';
import waterdrop from '../assets/waterdrop.png';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { formatDistance } from 'date-fns';
import { pt } from 'date-fns/locale';
import { Load } from '../components/Load';


export function MyPlants(){
    const [myPlants, setMyPlants] = useState<PlantProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [nextWaterd, setNextWatered] = useState<string>();

    useEffect(() => {
        async function loadStorageData() {
            const plantsStoraged = await loadPlant();

            const nextTime = formatDistance(
                new Date(plantsStoraged[0].dateTimeNotification).getTime(),
                new Date().getTime(),
                { locale: pt }
            );

            setNextWatered(
                `Não esqueça de regar a ${plantsStoraged[0].name} à ${nextTime} horas.`
            ) 
            
            setMyPlants(plantsStoraged);
            setLoading(false);
        }

        loadStorageData();
    },[])

    if(loading)
        return <Load />
    return(
        <SafeAreaView style={styles.container}>
            <Header />

            <View style={styles.spotlight}>
                <Image 
                    style={styles.spotlightImage}
                    source={waterdrop}
                />
                <Text style={styles.spotlightText}>
                   {nextWaterd}
                </Text>
            </View>

            <View style={styles.plants}>
                <Text style={styles.plantsTitle}>
                    Próximas regadas
                </Text>
                <FlatList 
                    data={myPlants}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({ item }) => (
                       <PlantCardSecondary 
                            data={item} 
                            // handleRemove={() => {handleRemove(item)}}
                        />
                    )}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </SafeAreaView>
        
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
        paddingTop: 50,
        backgroundColor: colors.background
    },
    spotlight:{
        backgroundColor: colors.blue_light,
        paddingHorizontal: 20,
        borderRadius: 20,
        height: 110,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    spotlightImage:{
        width: 60,
        height: 60
    },
    spotlightText:{
        flex: 1,
        color: colors.blue,
        paddingHorizontal: 20,
    },
    plants:{
        flex: 1,
        width: '100%'
    },
    plantsTitle:{
        fontSize: 24,
        fontFamily: fonts.heading,
        color: colors.heading,
        marginVertical: 20
    }



});