import { AsyncStorage } from 'react-native';

  _fetchData = async() => {
    try {
        const API_STEM = await AsyncStorage.getItem('API_STEM');
        let address = `${API_STEM}/solar`;
        console.log("Address from AsyncStorage: ", address);
        let response = await fetch(address);
        console.log(response);
        let responseJson = await response.json();

        this.setState({
        isLoading: false,
        dataSource: responseJson.solar_data,
        refreshing: false,
        }, function() {
            Alert.alert("New Data Recieved"); 
        });

    } catch(error) {
        console.error((error));
        //let str = JSON.stringify(error);
        console.log(error); 
        //if (error.slice(0,23) == "Network request failed") { 
        //Alert.alert("Check address in settings.")};
    }
  }

  //export default _fetchData;
