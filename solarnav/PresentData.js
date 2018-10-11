import React, { Component } from 'react';
import { AsyncStorage, Alert, Button, FlatList, ActivityIndicator, StyleSheet, Text, View }
  from 'react-native';


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

class PresentData extends Component {

  constructor(props) {
    super(props);
    this.state={
      isloading: true,
      dataSource: null,
      refreshing: false,
    }
  }
  componentDidMount() {
    console.log('PresentData componentDidMount'); 
    this._fetchData();
  }

  componentWillUpdate() {
    console.log('PresentData componentWillUpdate')
  }
  componentDidUpdate() {
    console.log('PresentData componentDidUpdate');  
  }

  _fetchData = async() => {
    try {
        const API_STEM = await AsyncStorage.getItem('API_STEM');
        let address = `${API_STEM}/solar`;
        console.log("Address from AsyncStorage: ", address);
        let response = await fetch(address);
        let responseJson = await response.json();

        this.setState({
        isLoading: false,
        dataSource: responseJson.solar_data,
        refreshing: false,
        }, function() {
            Alert.alert("New Data Recieved"); 
        });

    } catch(error) {
        console.error(error);    
        Alert.alert("Check address in settings.");
    }
  }

  handleRefresh = () => {
    this.setState({
      refreshing: true,  
    },
    () => {
      this._fetchData();  
    });  
  }

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
            refreshing={this.state.refreshing}
            onRefresh={this.handleRefresh}
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

/*
        <View style={styles.buttonContainer}>
          <Button
            title="Request Data"
            onPress={() => this._fetchData()}
          />
        </View>
*/
