import React, { Component } from 'react';
import { Alert, FlatList, ActivityIndicator, StyleSheet, Text, View } from 'react-native';

class FlatListItem extends Component {
  render() {
    return (
      <View style={{
        flex: 1,
        backgroundColor: this.props.index % 2 == 0 ? 'green' : 'grey'  
      }}>
        <View style={styles.rowsContainer}>
          <Text style={[styles.flatListItem, styles.param]}>{this.props.item.param}:</Text>
          <Text style={[styles.flatListItem, styles.solar]}>{String(this.props.item.solar)}</Text>
        </View>
      </View>
    );  
  }
}

export default class Solar extends Component {

  constructor(props) {
    super(props);
    this.state={isLoading: true}  
  }

  componentDidMount() {
    return fetch('http://192.168.1.109:5000')
      .then((response) => response.json())
      .then((responseJson) => {
        
        this.setState({
          isLoading: false,
          dataSource: responseJson.solar_data
        }, function() {

            //console.log('responseJson: ', responseJson);
            //console.log('responseJson[0]: ', responseJson.solar_data[0].param);
            //console.log('responseJson[9]: ', responseJson.solar_data[9]);
            //console.log('this.state.dataSource: ', typeof this.state.dataSource);
            //console.log('responseJson: ', typeof responseJson);
            //data=responseJson.solar_data;
            //darray=Object.entries(data);
            //console.log(darray);
            //var keys = Object.keys(this.state.dataSource);
            //var values = Object.values(this.state.dataSource);
            //console.log('keys: ', typeof keys);
            //console.log('values: ', typeof values);
            //for(var i=0;i<keys.length;i++){
                  //var key = keys[i];
                      //console.log(key +": " + this.state.dataSource[key]);
            //}
            //Alert.alert(
              //"Data",
              //"Data - " + JSON.stringify(responseJson)
            //)
        });
          
      })
      .catch((error) => {
        console.error(error); 
      });
  }

  render() {

    if(this.state.isLoading) {
      return(
        <View style={{flex: 1, padding: 50}}>
          <ActivityIndicator/>
        </View>
      );
    }
    
    return (
      <View style={styles.container}>
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
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 25
  },
  rows: {
    flex: 1  
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
  },
  solar: {
    flex: 1,
    alignItems: "center",
    textAlign: "left",
  }
});

module.exports = Solar;
