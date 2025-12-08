import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image
} from 'react-native';

import colors from '../styles/colors';
import fonts from '../styles/fonts';
import userImg from '../assets/marcos.png';

export function Header(){
    return(
      <View style={styles.container}>
            <View>
                <Text style={styles.greeting}>Olá,</Text>
                <Text style={styles.userName}>Marcos</Text>
            </View>
            <Image source={userImg} style={styles.image}/>
      </View>  
      
    )
}

const styles =  StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
    },
    greeting:{
        fontSize: 32,
        color: colors.heading,
        fontFamily: fonts.text
    },

    userName:{
        fontSize: 32,
        fontFamily: fonts.heading,
        color: colors.heading,
        lineHeight: 40
    },
    
    image:{
        width: 80,
        height: 80,
        borderRadius: 40
    },
    
   
  
});