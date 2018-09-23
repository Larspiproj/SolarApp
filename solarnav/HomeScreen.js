import React, { Component } from 'react';
import { StyleSheet, Button, Text, View } from 'react-native';

class HomeScreen extends Component {
  static navigationOptions = {
          title: 'Home',
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Home</Text>
        <Button
          title="Go to Data"
          onPress={() => {
            this.props.navigation.navigate('Data', {
              API_URL: "http://192.168.1.109:5000/solar"
            })
          }}
        />
      </View>
    );  
  }  
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',  
    },
});

export default HomeScreen;
