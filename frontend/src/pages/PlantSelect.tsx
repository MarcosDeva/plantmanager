import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Header } from '../components/Header';
import { EnviromentButton } from '../components/EnviromentButton';
import { PlantCardPrimary } from '../components/PlantCardPrimary';
import { Load } from '../components/Load';

import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { isDisabled } from 'react-native/types_generated/Libraries/LogBox/Data/LogBoxData';


interface EnviromentProps {
    key: string;
    title: string;
}

interface PlantsProps {
      id: string;
      name: string;
      about: string;
      water_tips: string;
      photo: string;
      environments: [string];
      frequency: {
        times: number;
        repeat_every: string;
      }
}

export function PlantSelect(){
    const[enviroments, setEnviroments] = useState<EnviromentProps[]>([]);
    const[plants, setPlants] = useState<PlantsProps[]>([]);
    const[filteredPlants, setFilteredPlants] = useState<PlantsProps[]>([]);
    const[enviromentSelected, setEnviromentSelected] = useState('all');
    const[loading, setLoading] = useState(true);
    
    const [page, setPage] =  useState(1);
    const [loadingMore, setLoadingMore] =  useState(false);
    const [loadedAll, setLoadedAll] =  useState(false);


    function handleEnviromentSelected(environment: string){
        setEnviromentSelected(environment);

        if(environment === 'all')
            return setFilteredPlants(plants);
        const filtered = plants.filter(plant =>
            plant.environments.includes(environment)
        );

        setFilteredPlants(filtered);
    }

    async function fetchPlants() {
                 fetch(`http://192.168.0.164:3000/plants/page/${page}/limit/5`)
                .then((response) => response.json())
                .then((data) => {

                    if(!data)
                        // return setLoading(true);
                    
                    if(page > 1 ){
                        
                        setPlants(oldValue => [...oldValue, ...data])
                        setFilteredPlants(oldValue => [...oldValue, ...data])
                    } else {
                        setPlants(data);
                        setFilteredPlants(data);
                    }
                   
                    // setLoading(false);
                    setLoadingMore(false);
                })
                .catch((err) => {
                    console.log(err.message);
                });
    }

    function handleFetchMore(distance: number){
        if(distance < 1)
            return;
        // setLoadingMore(true);
        setPage(oldValue => oldValue + 1 );
        fetchPlants();

    }

    

    useEffect(() => {
        async function fetchEnviroment(){

            fetch('http://192.168.0.164:3000/plants-environments')
            .then((response) => response.json())
            .then((data) => {
                setEnviroments([
                    {
                        key: 'all',
                        title: 'Todos',
                    },
                    ...data
                ]);
            })
            .catch((err) => {
                console.log(err.message);
            });

        }
        fetchEnviroment();
        
    }, []);


    if(loading)
        return <Load />
    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>

                <Header />
            
                <Text style={styles.title}>
                    Em qual hambiente 
                </Text>

                <Text style={styles.subtitle}>
                     você quer colocar sua planta?
                </Text>
            </View>
            
            <View>
                <FlatList
                    data={enviroments} 
                    renderItem={( {item}) => (
                        <EnviromentButton 
                            title={item.title} 
                            active={item.key === enviromentSelected}
                            onPress={()=> handleEnviromentSelected(item.key)}
                        />
                    )}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.enviromentList}
                />
            </View>

            <View style={styles.plants}>
                <FlatList 
                    data={filteredPlants}
                    renderItem={({ item }) => (
                        <PlantCardPrimary 
                            data={item}
                        />
                    )}
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                    onEndReachedThreshold={0.1}
                    onEndReached={({ distanceFromEnd }) => 
                        handleFetchMore(distanceFromEnd) 
                    }
                />
            </View>
            
        </SafeAreaView>
      
    )
}

const styles =  StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background
    },
    header: {
        paddingHorizontal: 30
    },
    title: {
        fontFamily: fonts.heading,
        fontSize: 17,
        color: colors.heading,
        lineHeight: 20,
        marginTop: 15
    },
    subtitle: {
        fontSize: 17,
        color:  colors.heading,
        fontFamily: fonts.text,
        lineHeight: 20,
        
     
    },
    enviromentList: {
        height: 40,
        justifyContent: 'center',
        paddingBottom: 5,
        marginLeft: 32,
        marginVertical: 32
    },
    plants: {
        flex: 1,
        paddingHorizontal: 32,
        justifyContent: 'center'
    },
    plantsContainer: {},

    content: {},
    footer: {},
});