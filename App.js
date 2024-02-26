import { View } from 'react-native';
import React, { useState } from "react";
import Styles from './style/Styles';
import Home from './components/Home';
import Gameboard from './components/Gameboard';
import Scoreboard from './components/Scoreboard';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';



const Tab = createBottomTabNavigator();

export default function App() {



  return (
    <View style={Styles.container}>
      <NavigationContainer style={Styles.bottomContainer}>
        <Tab.Navigator
          screenOptions={({route}) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Home') {
                iconName = 'information-circle-outline';
              } else if (route.name === 'Gameboard') {
                iconName = 'dice-multiple';
              } else if (route.name === 'Scoreboard') {
                iconName = 'list-alt';
              }

              if (route.name === 'Home') {
                return <Ionicons name={iconName} size={25} color={color} />;
              } else if (route.name === 'Gameboard') {
                return <MaterialCommunityIcons name={iconName} size={30} color={color} />;
              } else if (route.name === 'Scoreboard') {
                return <FontAwesome6 name={iconName} size={20} color={color} />;
              }
            },
            tabBarActiveTintColor: '#f28482',
            tabBarInactiveTintColor: '#8b819b',
          })}
        >
          <Tab.Screen name="Home" component={Home}>
          </Tab.Screen>
          <Tab.Screen name="Gameboard" component={Gameboard}>
          </Tab.Screen>
          <Tab.Screen name="Scoreboard" component={Scoreboard}>
          </Tab.Screen>
        </Tab.Navigator>
      </NavigationContainer>
    </View>
  );
}
