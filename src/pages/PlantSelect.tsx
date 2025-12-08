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

import api from '../service/api';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface EnviromentProps {
    key: string;
    title: string;
}

export function PlantSelect(){
    const[enviroments, setEnviroments] = useState<EnviromentProps[]>([]);
  
    useEffect(() => {
        // async function fetchEnviroment() {
        //     const { data } = await api.get('/plants_enviroments');
        //     setEnviroments(data);
        //     console.log(data);
        // }
        async function fetchEnviroment() {
            try{
                const { data } = await api.get('/plants_enviroments');
                setEnviroments(data);
            } catch (err){
                console.log('Erro na API,',err);
            }
        }
        fetchEnviroment();

    },[])


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
                    keyExtractor={(item) => item.key}
                    renderItem={( {item}) => (
                        <EnviromentButton 
                            title={item.title} 
                            active
                        />
                    )}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    //sempre que for uma Flat list e assim que deve ser passado o css
                    contentContainerStyle={styles.enviromentList}
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
    content: {},
    footer: {},
});