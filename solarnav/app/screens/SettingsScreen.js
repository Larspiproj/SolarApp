import React, { Component } from 'react';
import {  
          Alert,
          StyleSheet,
          Text,
          View,
          TextInput,
          Button,
          TouchableOpacity,
          Keyboard,
          AsyncStorage,
        } from 'react-native';

class SettingsScreen extends Component {
  constructor(props) {
    super(props);
    this.state= {
      API_STEM: 'http://192.168.1.109:5000',
    }  
  }

  componentDidMount() {
    console.log("Settings Did Mount");
  }

  componentDidUpdate() {
    console.log("Settings Did Update");
  }

  submit=() => {
    const {API_STEM} = this.state;
    if(API_STEM=="") {
      this.setState({Message: "Please provide address"});
    } else if (!API_STEM.startsWith('http://')) {
      this.setState({Message: "Please start address with http://"});  
    } else {
      this.setState({Message: "Adress submitted successfully"});
      AsyncStorage.setItem('API_STEM', API_STEM);
    }
    Keyboard.dismiss();
    console.log(API_STEM);
  }

  displayAPI_STEM = async() => {
    try {
      let API_STEM = await AsyncStorage.getItem('API_STEM');
       Alert.alert('Address currently stored in AsyncStorage',
       API_STEM);  
    }

    catch(error) {
      alert(error);  
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.upperContainer}>
          <Text>Settings</Text>
        </View>
        <View style={styles.middleContainer}>
          <Text style={styles.errorText}>
          {this.state.Message}
          </Text> 
          <Text style={{color: 'white'}}>Enter Address</Text>
          <TextInput
          placeholder="enter address"
          value={this.state.API_STEM}
          textContentType='URL'
          underlineColorAndroid='transparent'
          style={styles.inputText}
          onChangeText= {
            API_STEM => this.setState({API_STEM})  
          }
          />

          <TouchableOpacity style={styles.submit}
          onPress={this.submit}
          >
          <Text style={styles.submitText}>Submit</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.submit}
          onPress={this.displayAPI_STEM}
          >
          <Text style={styles.submitText}>Display stored address</Text>
          </TouchableOpacity>
        </View>
      </View>
    );  
  }  
}

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    marginTop: 25,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: 'grey',  
  },
  upperContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',  
  },
  middleContainer: {
    flex: 9,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: 'blue',  
  },
  inputText: {
    borderWidth: 3,
    borderColor: 'green',
    margin: 10,
    padding: 10,
    width: 300,
    backgroundColor: '#f2f2f2',
    borderRadius: 10
  },
  submit: {
    margin: 10,
    backgroundColor: 'green',
    padding: 5,
    width: 120,
    borderRadius: 10
  },
  submitText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    //fontWeight: 'bold',  
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    fontSize: 20,
  },
});

export default SettingsScreen;
