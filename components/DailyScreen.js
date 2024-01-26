import React, { useState, useEffect, useCallback } from 'react';
import Header from './Header';
import { getIconName } from './getIconName'; 
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  Image,
} from 'react-native';

const Item = ({ time, temp, windSpeed, icon, description, images }) => {
  const iconName = getIconName(icon, description);
  return (
    <View style={styles.item}>
      <Text style={styles.time}>{time}</Text>
      <Image style={styles.icon} source={images[iconName]} />
      <View>
        <Text style={{...styles.title, textTransform: 'capitalize'}}>{description}</Text>
        <Text style={styles.title}>Temperature: {temp}°C</Text>
        <Text style={styles.title}>Wind Speed: {windSpeed}m/s</Text>
      </View>
    </View>
  );
};

const DailyScreen = ({ location, images, locationName }) => {
  const [forecastData, setForecastData] = useState([]);

  const refreshWeather = useCallback(async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${location.latitude}&lon=${location.longitude}&units=metric&appid=3db444a60b76cca61fdbc4a5a15a276b&lang=en`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }
      
      const data = await response.json();

      const groupedData = data.list.reduce((groups, item) => {
        const date = new Date(item.dt_txt);
        const day = date.toLocaleDateString('en-FI', { weekday: 'long' });
        if (!groups[day]) {
          groups[day] = [];
        }
        groups[day].push({
          id: item.dt_txt,
          time: date.toLocaleTimeString('en-FI', {
            hour: '2-digit',
            minute: '2-digit',
          }),
          temp: item.main.temp,
          windSpeed: item.wind.speed,
          icon: item.weather[0].icon,
          description: item.weather[0].description
        });
        return groups;
      }, {});

      setForecastData(
        Object.entries(groupedData).map(([day, items]) => ({ day, items }))
      );
    } catch (error) {
      console.error(error);
      Alert.alert('Error', error.message);
    }
  }, [location]);

  useEffect(() => {
    refreshWeather();
  }, [refreshWeather]);

  const renderDay = ({ day, items }) => {
    let [dayOfWeek, date] = day.split(', ');
    let formattedDate = date.split('/').slice(0, 2).join('.');

    day = `${dayOfWeek} ${formattedDate}`;

    return (
      <View style={styles.day}>
        <Text style={styles.dayTitle}>{day}</Text>
        {items.map((item) => (
          <Item key={item.id} {...item} images={images} />
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header location={locationName} />
      <FlatList
        data={forecastData}
        renderItem={({ item }) => renderDay(item)}
        keyExtractor={(item) => item.day}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  day: {
    backgroundColor: '#A4C5C4',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  dayTitle: {
    fontSize: 32,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  item: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    color: '#FFFFFF',
  },
  time: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  icon: {
    width: 70,
    height: 70,
    marginHorizontal: 20,
  },
});

export default DailyScreen;
