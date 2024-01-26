import * as Location from 'expo-location';

export async function getCurrentPosition(setLocation) {
  const { status } = await Location.getForegroundPermissionsAsync();
  if (status === 'granted') {
    const location = await Location.getCurrentPositionAsync({});
    setLocation({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
    console.log("getCurrentPosition" + location.coords.latitude)
  } else {
    Alert.alert(
      'Permission denied',
      'You need to grant location permissions to get your location'
    );
  }
}
