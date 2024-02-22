import React from "react";
import {View, Text} from "react-native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs"
import Menu from "./componentes/home/Menu";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import ListComponent from "./componentes/list/List";
import User from './screen/User'
import Chat from "./screen/Chat";
import Pdf from "./screen/Pdf";

const Tab = createBottomTabNavigator()

const Navigation = () => {
    return (
        <Tab.Navigator initialRouteName="Home">
            <Tab.Screen name="Home" component={Menu} options={{
                tabBarLabel: 'Home',
                tabBarIcon: ({color, size}) => (
                    <MaterialCommunityIcons name="home" color={color} size={size}/>
                )
            }}/>
            
            <Tab.Screen name={'nombre'} component={User} options={{
                tabBarLabel: 'Name',
                tabBarIcon: ({color, size}) => (
                    <MaterialCommunityIcons name={'account'} color={color} size={size}/>
                )
            }}/>
            <Tab.Screen name={'OpenIA'} component={Chat} options={{
                tabBarLabel: 'OpenIA',
                tabBarIcon: ({color, size}) => (
                    <MaterialCommunityIcons name={'brain'} color={color} size={size}/>
                )
            }}/>
            <Tab.Screen name={'PDF'} component={Pdf} options={{
                tabBarLabel: 'PDF',
                tabBarIcon: ({color, size}) => (
                    <MaterialCommunityIcons name={'file-pdf-box'} color={color} size={size}/>
                )
            }}/>
            
        </Tab.Navigator>
    )
}

export default Navigation