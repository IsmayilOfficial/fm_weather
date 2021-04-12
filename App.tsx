import { StatusBar } from 'expo-status-bar';
import React, {useEffect,useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location';


export default function App() {

  const [location, setLocation] = useState<undefined | Location.LocationObject>(undefined);

  async function getLocation() {
    const {status} = await Location.requestPermissionsAsync();
    if(status !== 'granted'){
      alert('location permission denied. App will not work.');
    }
   const userLocation = await Location.getCurrentPositionAsync();
   setLocation(userLocation);
    
  }
  useEffect(() => {
    getLocation();
   
  }, [])
  return (
    <View style={styles.container}>
      <Text>This will be my first weather app</Text>
      <Text>{location?.coords.latitude}</Text>
      <Text>{location?.coords.longitude}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
