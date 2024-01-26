import React, { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import NowScreen from './components/NowScreen';
import DailyScreen from './components/DailyScreen';
import About from './components/About';
import Help from './components/Help';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo, Ionicons } from '@expo/vector-icons';
import useLocation from './components/useLocation';

const Tab = createBottomTabNavigator();

export default function App() {
  const { location, setLocation, locationName, setLocationName } = useLocation();

  const images = {
    '01d': require('./assets/01d.png'),
    '01n': require('./assets/01n.png'),
    '02d': require('./assets/02d.png'),
    '02n': require('./assets/02n.png'),
    '03d': require('./assets/03d.png'),
    '03n': require('./assets/03n.png'),
    '04d': require('./assets/04d.png'),
    '04n': require('./assets/04n.png'),
    '09d': require('./assets/09d.png'),
    '09n': require('./assets/09n.png'),
    '10d': require('./assets/10d.png'),
    '10n': require('./assets/10n.png'),
    '11d': require('./assets/11d.png'),
    '11dRain': require('./assets/11dRain.png'),
    '11n': require('./assets/11n.png'),
    '11nRain': require('./assets/11nRain.png'),
    '13d': require('./assets/13d.png'),
    '13dRain': require('./assets/13dRain.png'),
    '13dShower': require('./assets/13dShower.png'),
    '13dSleet': require('./assets/13dSleet.png'),
    '13n': require('./assets/13n.png'),
    '13nRain': require('./assets/13nRain.png'),
    '13nShower': require('./assets/13nShower.png'),
    '13nSleet': require('./assets/13nSleet.png'),
    '50d': require('./assets/50d.png'),
    '50n': require('./assets/50n.png'),
    tornado: require('./assets/tornado.png'),
  };

  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: '#A4C5C4',
        }}>
        <Tab.Screen
          name="Now"
          children={() => (
            <NowScreen
              location={location}
              setLocation={setLocation}
              images={images}
              locationName={locationName}
              setLocationName={setLocationName}
            />
          )}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="sunny" size={30} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="5 Day Forecast"
          children={() => (
            <DailyScreen
              location={location}
              images={images}
              locationName={locationName}
            />
          )}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="calendar" size={30} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="About"
          component={About}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Entypo name="info" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Help"
          component={Help}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Entypo name="help" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
