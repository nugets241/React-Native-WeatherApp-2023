import { View, Text, StyleSheet, Button, Linking } from "react-native";

export default function Help() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}> Help </Text>
      <Text style={styles.content}> 
        If you need any assistance with the application, feel free to reach out to us. 
      </Text>
      <Text style={styles.content}>
        You can also check the OpenWeatherMap API documentation for more details about the weather data used in this app 
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
