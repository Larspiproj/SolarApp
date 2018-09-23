import React, { Component } from 'react';
import { Alert, Button, FlatList, ActivityIndicator, StyleSheet, Text, View }
  from 'react-native';
//import { createBottomTabNavigator } from 'react-navigation';


class FlatListItem extends Component {
  render() {
    return (
      <View style={{
        flex: 1,
        backgroundColor: this.props.index % 2 == 0 ? 'green' : 'grey'  
      }}>
        <View style={styles.rowsContainer}>
          <Text style={[styles.flatListItem, styles.param]}>
            {this.props.item.param}:
          </Text>
          <Text style={[styles.flatListItem, styles.solar]}>
            {String(this.props.item.solar)}
          </Text>
        </View>
      </View>
    );  
  }
}

//const API_URL = "";

class PresentData extends Component {

  constructor(props) {
    super(props);
    this.state={
      isloading: true,
      dataSource: null,
    }
  }
  componentDidMount() {
    console.log('componentDidMount'); 
    this._onPress();
    /*
    return fetch(this.props.API_URL)
       //fetch('http://192.168.1.109:5000/solar')
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
    */
  }

  componentDidUpdate() {
    console.log('componentDidUpdate');  
  }

  _onPress = async() => {
    try {
        let response = await fetch(this.props.API_URL);
        let responseJson = await response.json();

        this.setState({
        isLoading: false,
        dataSource: responseJson.solar_data    
        }, function() {
            Alert.alert("New Data Recieved"); 
        });

    } catch(error) {
        console.error(error);    
    }
  }
  /*
  _onPress=() => {
     fetch(this.props.API_URL)
     //fetch('http://192.168.1.109:5000/solar')
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
  */

  render() {

    if(this.state.isLoading) {
      return(
        <View style={{flex: 1, padding: 50}}>
          <ActivityIndicator />
        </View>
      );  
    }
    return (
      <View style={styles.container}>
        <View style={styles.flatListContainer}>
          <FlatList
            data={this.state.dataSource}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => {
              return (
                <FlatListItem
                  item={item}
                  index={index}
                />
              );
           }}
           >
          </FlatList>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Request Data"
            onPress={() => this._onPress()}
          />
        </View>
      </View>
    );  
  }  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 25,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  flatListContainer: {
    flex: 7,
  },
  flatListItem: {
    color: "white",
    padding: 10,
    fontSize: 16
  },
  rowsContainer: {
    flex: 1,
    flexDirection: "row",  
  },
  param: {
    flex: 1,
    alignItems: "center",
    textAlign: "left",
    //fontSize: 20,
  },
  solar: {
    flex: 1,
    alignItems: "center",
    textAlign: "left",
    //fontSize: 24
  }
});

export default PresentData;
