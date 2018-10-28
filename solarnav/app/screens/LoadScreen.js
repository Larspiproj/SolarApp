import React, { Component } from 'react';
import { AsyncStorage, Alert, TouchableOpacity, StyleSheet, Text, View } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

class LoadScreen extends Component {
  static navigationOptions = {
    //title: 'Load ON/OFF'
    header: null,
    //headerStyle: {
      //backgroundColor: 'grey',
      //borderColor: 'grey', 
    //}  
  };
  constructor(props) {
    super(props);
    this.state={
      isLoading: true,
      dataSource: '',  
    }  
  }
  componentDidMount() {
    console.log('LoadScreen componentDidMount');
    this._load();
  }

  componentDidUpdate() {
    console.log('LoadScreen componentDidUpdate');  
  }

  _load = async() => {
    try {
        const API_STEM = await AsyncStorage.getItem('API_STEM');
        const ENDPOINT = await AsyncStorage.getItem('ENDPOINT');
        let response = await fetch(`${API_STEM}${ENDPOINT}`);
        let responseJson = await response.text();

        this.setState({
        isLoading: false,
        dataSource: responseJson,
        refreshing: false,
        }, function() {
            console.log('dataSource: ', responseJson);
            console.log('dataSource: ', typeof responseJson);
            //Alert.alert("New Data Recieved"); 
        });

    } catch(error) {
        console.error(error);    
        Alert.alert("Check address in settings.");
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.upperContainer}>
          <View style={styles.upperButton}>
            <TouchableOpacity
              underlayColor = 'white'
              onPress={() => this.props.navigation.goBack()}>
              <View style={styles.button}>
                <Text>
                <Ionicons name="ios-arrow-back" size={40} color="white" />
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.middleContainer}>
          <Text style={styles.buttonText}>
            Load is {this.state.dataSource}
          </Text>
        </View>
      </View>
    );  
  }  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 25,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: 'grey'  
  },  
  upperContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: '#f2f2f2',  
  },
  upperButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    //backgroundColor: 'blue',  
  },
  upperTitle: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: 'red',  
  },
  middleContainer: {
    flex: 9,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: 'blue',  
  },
  bottomContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: 'red',  
  },
  button: {
    //backgroundColor: 'green',
    //padding: 5,
    marginLeft: 10,
    //width: 120,
    //borderRadius: 10
  },
  buttonText: {
    color: 'white',
    //textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',  
  },
});

export default LoadScreen;

