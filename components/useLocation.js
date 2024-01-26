import { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import { getCurrentPosition } from './getCurrentPosition';

export default function useLocation() {
  const [location, setLocation] = useState({
    latitude: 5.9899,
    longitude: 124.624,
  });
  const [locationName, setLocationName] = useState('Kiamba'); // New state for location name

  const requestPermissions = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission denied');
      }
    } catch (error) {
      console.error(error);
    }
  };

  // New function to get user's current location
  useEffect(() => {
    requestPermissions();
    getCurrentPosition(setLocation);
  }, []);

  return { location, setLocation, locationName, setLocationName };
}