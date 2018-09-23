import React, { Component } from 'react';
import { Alert } from 'react-native';


const API_STEM = "http://192.168.1.109:5000/solar";

constructor(props) {
  super(props);
  this.state={
    isloading: true,
    dataSource: null,
  }
}
componentDidMount() {
    console.log('componentDidMount'); 
}

componentDidUpdate() {
    console.log('componentDidUpdate');  
}

_onPress=() => {
  fetch(`${API_STEM}`)
  .then((response) => response.json())
  .then((responseJson) => {
    //return responseJson.solar_data;

    this.setState({
      isLoading: false,
      dataSource: responseJson.solar_data  
    }, function() {
       Alert.alert(
        "New Data Recieved",
        //"Data - " + JSON.stringify(responseJson)
      ) 
    });
  })
  .catch((error) => {
    console.error(error);
  });
}

export default _onPress;
