import React, { Component } from 'react';
import { Alert, Button, FlatList, ActivityIndicator, StyleSheet, Text, View }
  from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';

import DataScreen from "./DataScreen";
import SettingsScreen from "./SettingsScreen";
import HomeScreen from "./HomeScreen";

export default createBottomTabNavigator ({
  Home: HomeScreen,
  Data: DataScreen,
  Settings: SettingsScreen
});

