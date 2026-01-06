import React, { useState } from 'react';
import {
    Alert,
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    Platform,
    TouchableOpacity
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import DateTimePicker, { Event } from '@react-native-community/datetimepicker';
import { format, isBefore } from 'date-fns';

import { SvgFromUri } from 'react-native-svg';
import { loadPlant, PlantProps, savePlant } from '../libs/storage';
import { Button } from '../components/Button';
import { SafeAreaView } from 'react-native-safe-area-context';

import fonts from '../styles/fonts';
import colors from '../styles/colors';
import waterdrop from '../assets/waterdrop.png';




interface Params {
    plant: PlantProps
}

export function PlantSave(){
    const [selectedDateTime, setSelectedDateTime] = useState(new Date());
    const [showDatePiker, setShowDatePiker] = useState(Platform.OS === 'ios');

    const route = useRoute();
    const { plant } = route.params as Params;

    function handleChangeTime(event: Event, dateTime: Date | undefined){
        if(Platform.OS === 'android'){
            setShowDatePiker(oldState => !oldState);
        }

        if(dateTime && isBefore(dateTime, new Date())){
            setSelectedDateTime(new Date());
            return Alert.alert('Escolha uma hora no futuro ⏰');
        }

        if(dateTime)
            setSelectedDateTime(dateTime);
    }

    function handleOpenDatetimePickerForAndroid(){
        setShowDatePiker(oldState => !oldState);
    }


    async function handleSave(){
        try { 
            await savePlant({
                ...plant,
                dateTimeNotification: selectedDateTime
            });
        } catch {
            Alert.alert('Não foi possivel salvar 😥');
        }
    }

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.plantInfo}>
                <SvgFromUri 
                    uri={plant.photo}
                    height={150}
                    width={150}
                />

                <Text style={styles.plantName}>
                    {plant.name}
                </Text>

                <Text style={styles.plantAbout}>
                    {plant.about}
                </Text>

            </View>
            <View style={styles.controller}>
                <View style={styles.tipContainer}>
                    <Image 
                        source={waterdrop}
                        style={styles.tipImage}
                    />
        
                    <Text style={styles.tipText}>
                        {plant.water_tips}
                   </Text>
                </View>
                <Text style={styles.alertLabel}>
                    Ecolha o melhor horário para ser lembrado:
                </Text>
               
               {showDatePiker && (
                    <DateTimePicker 
                        value={selectedDateTime}
                        mode="time"
                        display="spinner"
                        onChange={() => handleChangeTime}
                    />
               )}
                
               {
                Platform.OS === 'android' && (
                    <TouchableOpacity 
                        style={styles.dateTimePickerButton}
                        onPress={handleOpenDatetimePickerForAndroid}
                    >
                        <Text style={styles.dateTimePickerText}>
                            {`Mudar ${format(selectedDateTime, 'HH:mm')}`}
                        </Text>
                    </TouchableOpacity>
                    
                )
               }
                <Button title="Cadastrar planta" onPress={handleSave} />
            </View>
        </SafeAreaView>
            
        
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: colors.shape
    },
    plantInfo:{
        flex: 1,
        paddingHorizontal: 30,
        paddingVertical: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.shape
    },
    controller:{
        backgroundColor: colors.white,
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 20
    },
    plantName:{
        fontFamily: fonts.heading,
        fontSize: 24,
        color: colors.heading,
        marginTop: 15
    },
    plantAbout:{
        textAlign: 'center',
        fontFamily: fonts.text,
        fontSize: 17,
        marginTop: 10
    },
    tipContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.blue_light,
        padding: 20,
        borderRadius: 20,
        position: 'relative',
        bottom: 70
    },
    tipImage:{
        width: 56,
        height: 56
    },
    tipText:{
        flex: 1,
        marginLeft: 20,
        fontFamily: fonts.text,
        color: colors.blue,
        fontSize: 15,
        textAlign: 'justify',
    },
    alertLabel:{
        textAlign: 'center',
        fontFamily: fonts.complement,
        color: colors.heading,
        fontSize: 13,
        marginBottom: 5
    },
    dateTimePickerButton:{
        width: '100%',
        alignItems: 'center',
        paddingVertical: 40
    },
    dateTimePickerText:{
        color: colors.heading,
        fontSize: 24,
        fontFamily: fonts.text
    },
});