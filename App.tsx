import { StatusBar } from 'expo-status-bar';
import React, {useEffect,useState} from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location';

const API_KEY = "1a9c835c8268dfc1c2edb8f99313a945";
export default function App() {

  const [location, setLocation] = useState<undefined | Location.LocationObject>(undefined);
  const [currentWeather, setCurrentWeather] = useState<undefined | any>(undefined)
  const [weatherIconLink, setWeatherIconLink] = useState<undefined | string>(undefined)


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

  async function getWeather() {

    const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${location?.coords.latitude}&lon=${location?.coords.longitude}&exclude={part}&appid=${API_KEY}&units=metric`)
    const weatherResponse = await response.json();
    const {current} = weatherResponse;
    setCurrentWeather(current); 
    // const weatherLink = `http://openweathermap.org/img/wn/10d@2x.png`;
    const weatherLink = `http://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`;
    setWeatherIconLink(weatherLink);

    console.log(current);

  }
  useEffect(()=>{
    getWeather();
  },[location])
  return (
    <View style={styles.container}>
      
      <Text style={{fontSize: 50}}>{ currentWeather?.temp + "°C"} </Text>
      <Image style = {{width: 300, height: 300}} source ={{uri: weatherIconLink }}></Image>

    
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
