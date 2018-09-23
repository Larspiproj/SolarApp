import React, { Component } from 'react';
//import { AsyncStorage } from 'react-native';

import PresentData from "./PresentData";

class DataScreen extends Component {


  render() {
    const { navigation } = this.props;
    const API_URL = navigation.getParam('API_URL', 'NO-URL');
    console.log(API_URL)
    return (
      <PresentData
        API_URL={API_URL}
      />
    );  
  }
}

export default DataScreen;
