import React, { Component } from 'react';
import { StyleSheet,
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
      API_STEM: 'http://192.168.1.109:5000'  
      //address: ''
    }  
  }

  componentDidMount() {
    console.log("Settings Did Mount");
  }

  /*
  componentDidUpdate() {
    console.log("Settings Did Update");
    AsyncStorage.getItem(
      'address'
    ).then(address => {
      alert("After Update: ", address);  
    }
    )
  }
  */

  submit=() => {
    const {API_STEM} = this.state;
    if(API_STEM=="") {
      this.setState({Message: "Please provide address"});
    }else{
      this.setState({Message: "Adress submitted successfully"});
    }
    Keyboard.dismiss();

    AsyncStorage.setItem('API_STEM', API_STEM);


    console.log(API_STEM);
  }

  displayAPI_STEM = async() => {
    try {
      let API_STEM = await AsyncStorage.getItem('API_STEM');
       alert(API_STEM);  
    }

    catch(error) {
      alert(error);  
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>
        {this.state.Message}
        </Text> 
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
        <Text style={styles.submitText}>Display address</Text>
        </TouchableOpacity>
      </View>
    );  
  }  
}

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',  
  },
  inputText: {
    borderWidth: 3,
    borderColor: 'green',
    margin: 10,
    padding: 10,
    width: 300,
  },
  submit: {
    backgroundColor: 'green',
    padding: 10,
    width: 150,
  },
  submitText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',  
  },
  errorText: {
    color: 'red',
    textAlign: 'center'  
  },
});

export default SettingsScreen;
