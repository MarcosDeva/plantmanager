import React from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '../components/Button';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function Confirmation(){

    const navigation = useNavigation<any>();

    function HandleMoveOn(){
        navigation.navigate("PlantSelect");
    }

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.emoji}>
                   😄 
                </Text>
                <Text style={styles.title}>
                    Prontinho
                </Text>
                <Text style={styles.subtitle}>
                     Agora vamos começar a cuidar das suas {'\n'}
                     plantinhas com muito cuidado.
                </Text>

                <View style={styles.footer}>
                    <Button 
                        title='Começar'
                        onPress={HandleMoveOn}
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
       content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        padding: 30
    },
    title: {
        fontSize: 24,
        fontFamily: fonts.heading,
        textAlign: 'center',
        color: colors.heading,
        lineHeight: 38,
        marginTop: 15

    },
    subtitle: {
        fontFamily: fonts.text,
        textAlign: 'center',
        fontSize: 17,
        paddingVertical: 10,
        color: colors.heading
    },
 
    emoji: {
        fontSize: 78
    },
    footer: {
        width: '100%',
        paddingHorizontal: 50,
        marginTop: 20
    }


});