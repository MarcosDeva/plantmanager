import React from 'react';
import {} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import colors from '../styles/colors';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { PlantSelect } from '../pages/PlantSelect';
import { MyPlants } from '../pages/MyPlants';

const AppTab =  createBottomTabNavigator();

const AuthRoutes = () => {
    return(
        <AppTab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: colors.green,
                tabBarInactiveTintColor: colors.heading,
                tabBarStyle: {
                    paddingVertical: 20,
                    height: 88

                },
            }}
        >
            <AppTab.Screen 
                name="Nova Planta"
                component={PlantSelect}
                options={{
                   tabBarIcon: (({ size, color }) => (
                        <MaterialIcons 
                            name="add-circle-outline"
                            size={size}
                            color={color}
                        />
                   ))
                }}
            />

            <AppTab.Screen 
                name="Minhas Plantas"
                component={MyPlants}
                options={{
                   tabBarIcon: (({ size, color }) => (
                        <MaterialIcons 
                            name="format-list-bulleted"
                            size={size}
                            color={color}
                        />
                   ))
                }}
            />


              


        </AppTab.Navigator>
    )
}

export default AuthRoutes;