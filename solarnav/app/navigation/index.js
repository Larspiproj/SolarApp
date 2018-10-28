import React, { Component } from 'react';
import { Alert, Button, FlatList, ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, createMaterialTopTabNavigator } from 'react-navigation';

import DataScreen from "../screens/DataScreen";
import SettingsScreen from "../screens/SettingsScreen";
import HomeScreen from "../screens/HomeScreen";
import LoadScreen from "../screens/LoadScreen";

const HomeStack = createStackNavigator({
  Home: {
    screen: HomeScreen,
    //navigationOptions: {
      //headerLayoutPreset: 'center',
      //headerTitle: 'Tracer'
    //},
  },
  Load: {
    screen: LoadScreen
  },
});

export default createMaterialTopTabNavigator ({
  Home: {
    screen: HomeStack
  },
  Data: {
    screen: DataScreen
  },
  Settings: {
    screen: SettingsScreen,
    navigationOptions: {
      tabBarLabel: 'Settings',
      tabBarIcon: ({tintColor}) => (
        <Icon name="" color={tintcolor} size={24} />
      )
    }
  }
}, {
    tabBarPosition: 'bottom',
    swipeEnabled: true,
    animationEnabled: true,
    tabBarOptions: {
      activeTintColor: 'orange',  
      inactiveTintColor: 'grey',
      style: {
        backgroundColor: '#f2f2f2',  
      },
      indicatorStyle: {
        height: 0  
      },
      showIcon: false
    }
  });

