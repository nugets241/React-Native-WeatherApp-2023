import { View, Text, StyleSheet, Button, Linking } from "react-native";

export default function About() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}> About </Text>
      <Text style={styles.content}> 
        This is a simple weather application built using React Native. It allows you to navigate between different screens and view weather information. 
      </Text>
      <Text style={styles.content}>
        The weather data is fetched from the OpenWeatherMap API. You can find more information about this API 
        <Text style={styles.link} onPress={() => Linking.openURL('https://openweathermap.org/api')}>
          {' here.'}
        </Text>
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    textAlign: 'center',
    color: '#333333',
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  content: {
    textAlign: 'center',
    color: '#333333',
    fontSize: 20,
    marginHorizontal: 20,
    marginVertical: 10,
  },
  link: {
    color: 'blue',
  }
});
