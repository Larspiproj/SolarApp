import React, { Component } from 'react';
import { AsyncStorage, Alert, Button, FlatList, ActivityIndicator, StyleSheet, Text, View }
  from 'react-native';

class FlatListItem extends Component {
  render() {
    return (
      <View style={{
        flex: 1,
        backgroundColor: this.props.index % 2 == 0 ? 'grey' : 'green'  
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

class DataScreen extends Component {

  constructor(props) {
    super(props);
    this.state={
      isloading: true,
      dataSource: null,
      refreshing: false,
      header: 'Swipe Down to refresh'
    }
  }
  componentDidMount() {
    console.log('PresentData componentDidMount');
    this._loadInitialState();
    //this._fetchData();
  }

  componentWillUpdate() {
    console.log('PresentData componentWillUpdate')
  }
  componentDidUpdate() {
    console.log('PresentData componentDidUpdate');  
  }

  _loadInitialState = async() => {
    const API_STEM = await AsyncStorage.getItem('API_STEM');
    if (API_STEM !== null) {
      this._fetchData(API_STEM)
    } else {
      this.setState({refreshing: false});
      Alert.alert("Please specify address");
      this.props.navigation.navigate('Settings')  
    }
  }

  _fetchData = async(API_STEM) => {
    try {
        const time = new Date().toTimeString();
        //const API_STEM = await AsyncStorage.getItem('API_STEM');
        //if (!API_STEM) {
          //this.error = "RELOAD and check address in SETTINGS";
          //console.error((this.error));
          //Alert.alert("Please specify address");
          //return;  
        //} else {
          //this.error = null;
         //}
        let address = `${API_STEM}/solar`;
        console.log("Address from AsyncStorage: ", address);
        //let response = await fetch('http://192.168.1.109:5000/solar');
        let response = await fetch(address);
        console.log("Response:", response.ok);
        if (!response.ok) {
          throw Error(`Request rejected with status ${response.status}`);
          Alert.alert(Error)  
          //return response;
        }
        let responseJson = await response.json();
        
        this.setState({
        isLoading: false,
        dataSource: responseJson.solar_data,
        header: [`Last data received '${time}
          \xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0Swipe to refresh`],
        refreshing: false,
        }, function() {
            //Alert.alert("New Data Recieved"); 
        });

    } catch(error) {
        this.setState({refreshing: false});
        console.log((error));
        console.log(typeof error);
        Alert.alert(
        //"Check address and that server is running"
        error.name+" "+error.message
        );
        this.props.navigation.navigate('Settings');
        console.error((error));
        //setTimeout(function()
          //{Alert.alert("Check address in SETTINGS and that server is running")}, 1000);
        //let str = JSON.stringify(error);
        //console.log(typeof error); 
        //Alert.alert("Check address in settings.");
        //if (error.slice(0,23) == "Network request failed") { 
        //Alert.alert("Check address in settings.")};
    }
  }

  handleRefresh = () => {
    this.setState({
      refreshing: true,  
    },
    () => {
      this._loadInitialState();  
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
        <View style={styles.upperContainer}>
          <Text>{this.state.header}</Text>
        </View>
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
    backgroundColor: 'grey',
  },
  upperContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',  
  },
  flatListContainer: {
    flex: 9,
    //backgroundColor: 'red',
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

export default DataScreen;

/*
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
        <View style={styles.buttonContainer}>
          <Button
            title="Request Data"
            onPress={() => this._fetchData()}
          />
        </View>
*/
