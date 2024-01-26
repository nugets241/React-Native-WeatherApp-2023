import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Platform,
  Linking,
  Alert,
} from 'react-native';
import { getCurrentPosition } from './getCurrentPosition';

const LocationInput = ({
  location,
  onLocationChange,
  locationName,
  useGeoLocation,
  setUseGeoLocation,
}) => {
  const [inputValueGeo, setInputValueGeo] = useState({
    latitude: location.latitude,
    longitude: location.longitude,
  });
  const [inputValueName, setInputValueName] = useState(locationName);

  useEffect(() => {}, [location]);

  const handlePress = () => {
  if (!useGeoLocation) {
    (async () => { // Define and immediately invoke the async function
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${inputValueName}&units=metric&appid=3db444a60b76cca61fdbc4a5a15a276b&lang=en`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch weather data');
        }
        const data = await response.json();

        if (data.coord.lat) {
          onLocationChange({
            latitude: data.coord.lat,
            longitude: data.coord.lon,
          }); // Set the location name
        }
      } catch (error) {
        console.error(error);
        Alert.alert('Error', error.message);
      }
    })(); // Immediately invoke the async function
  } else {
    const { latitude, longitude } = inputValueGeo;
    onLocationChange({ latitude, longitude });
  }
};


  function showCurrentLocationOnMap() {
    const url = Platform.select({
      android: `geo:${location.latitude},${location.longitude}`,
      ios: `maps:${location.latitude},${location.longitude}`,
    });
    Linking.openURL(url);
  }

  return (
    <View style={styles.container}>
      <Button
        color="#A4C5C4"
        title={`Use ${useGeoLocation ? 'Location Name' : 'GeoLocation'}`}
        onPress={() => setUseGeoLocation(!useGeoLocation)}
      />
      {useGeoLocation ? (
        <View style={styles.geoContainer}>
          <TextInput
            style={styles.input}
            onChangeText={(text) =>
              setInputValueGeo((values) => ({ ...values, latitude: text }))
            }
            value={String(inputValueGeo.latitude)}
            placeholder="Latitude"
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            onChangeText={(text) =>
              setInputValueGeo((values) => ({ ...values, longitude: text }))
            }
            value={String(inputValueGeo.longitude)}
            placeholder="Longitude"
            keyboardType="numeric"
          />
        </View>
      ) : (
        <TextInput
          style={styles.input}
          onChangeText={setInputValueName}
          value={inputValueName}
          placeholder="Location Name"
        />
      )}
      <View style={styles.updateButtons}>
        <View style={styles.button}>
          <Button
            title="Use Current Location"
            onPress={() => {
              setUseGeoLocation(true);
              getCurrentPosition(onLocationChange);
            }}
            color="#A4C5C4"
          />
        </View>
        <View style={styles.button}>
          <Button
            title="Update Location"
            onPress={handlePress}
            color="#A4C5C4"
          />
        </View>
      </View>
      <View style={{ marginTop: 20 }}>
        <Button
          title="Show Location on Map"
          onPress={showCurrentLocationOnMap}
          color="#A4C5C4"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  geoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  input: {
    height: 40,
    width: '45%',
    margin: 12,
    borderWidth: 1,
    padding: 10,
    textAlign: 'center',
  },
  updateButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    marginHorizontal: '3%',
  },
});

export default LocationInput;
