import React, { Component } from 'react';
import { Alert, Button, FlatList, ActivityIndicator, StyleSheet, Text, View }
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

const styles = StyleSheet.create({
  rowsContainer: {
    flex: 1,
    flexDirection: 'row'  
  },
  flatListItem: {
    color: 'white',
    padding: 10,
    fontSize: 16  
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

export default FlatListItem;
