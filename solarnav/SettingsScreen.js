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
      address: ''  
    }  
  }

  componentDidMount() {
    console.log("Settings Did Mount");
    AsyncStorage.getItem(
      'address'
    ).then(address => {
      alert("After Mount: ", address);  
    }
    )
  }
  componentDidUpdate() {
    console.log("Settings Did Update");
    AsyncStorage.getItem(
      'address'
    ).then(address => {
      alert("After Update: ", address);  
    }
    )
  }

  submit=() => {
    const {address} = this.state;
    if(address=="") {
      this.setState({Error: "Please provide address"});
    }else{
      this.setState({Error: "Adress submitted successfully"});
    }
    Keyboard.dismiss();

    AsyncStorage.setItem('address', address);


    console.log(address);
    console.log(typeof address);
  }

  displayAddress = async() => {
    try {
      let address = await AsyncStorage.getItem('address');
       alert(address);  
    }

    catch(error) {
      alert(error);  
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>
        {this.state.Error}
        </Text> 
        <TextInput
        placeholder="enter address"
        style={styles.inputText}
        onChangeText= {
          address => this.setState({address})  
        }
        />

        <TouchableOpacity style={styles.submit}
        onPress={this.submit}
        >
        <Text style={styles.submitText}>Submit</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.submit}
        onPress={this.displayAddress}
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
