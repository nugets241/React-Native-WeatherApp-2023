import React, { useState, useEffect, useCallback, useContext } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Header from './Header';
import { getIconName } from './getIconName';
import Location from './Location';
import { getCurrentPosition } from './getCurrentPosition';

const NowScreen = ({
  location,
  setLocation,
  images,
  locationName,
  setLocationName,
}) => {
  const [weather, setWeather] = useState({
    icon: '01d',
    temperature: '20°C',
    windSpeed: '5m/s',
    description: 'Clear Sky',
    name: 'Helsinki',
  });
  const [isLoading, setIsLoading] = useState(false); // New state for loading  
  const [useGeoLocation, setUseGeoLocation] = useState(true);

  const refreshWeather = useCallback(async () => {
    setIsLoading(true); // Set loading to true
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&units=metric&appid=3db444a60b76cca61fdbc4a5a15a276b&lang=en`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }
      const data = await response.json();

      setLocationName(data.name ? data.name : 'Not A City'); // Set the location name

      const icon = data.weather[0].icon;
      const description = data.weather[0].description;
      const temperature = `${data.main.temp}°C`;
      const windSpeed = `${data.wind.speed}m/s`;

      setWeather({ icon, temperature, windSpeed, description });
    } catch (error) {
      console.error(error);
      Alert.alert('Error', error.message);
    }
    setIsLoading(false); // Set loading to false
  }, [location, setWeather, setLocationName]);

  useEffect(() => {
    refreshWeather();
  }, [refreshWeather]);

  const iconName = getIconName(weather.icon, weather.description);

  return (
    <View style={styles.container}>
      <Header location={!isLoading ? `${locationName}` : 'Loading...'} />
      {/* Wrap the location in a <Text> component */}
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" /> // Show a loading spinner if loading
      ) : (
        <>
          <Image style={styles.icon} source={images[iconName]} />
          <Text style={styles.temperature}>{weather.temperature}</Text>
          <Text style={styles.windSpeed}>Wind Speed: {weather.windSpeed}</Text>
          <Text style={styles.description}>{weather.description}</Text>
          <Location
            location={location}
            onLocationChange={setLocation}
            locationName={locationName}
            useGeoLocation={useGeoLocation}
            setUseGeoLocation={setUseGeoLocation}
          />
          <View style={styles.button}>
            <Button
              title="Refresh Weather"
              onPress={refreshWeather}
              color="#A4C5C4"
            />
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 100,
    height: 100,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding: 20, // Add padding
  },
  temperature: {
    fontSize: 30,
    fontWeight: 'bold', // Make the temperature bold
    marginTop: 20, // Add some margin
  },
  windSpeed: {
    fontSize: 20,
    marginTop: 10, // Add some margin
  },
  description: {
    fontSize: 20,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    marginTop: 10, // Add some margin
  },
  button: {
    marginTop: 20, // Add some margin
  },
});

export default NowScreen;
