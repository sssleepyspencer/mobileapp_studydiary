import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { weatherCodeMap } from '../utils/weatherCodeMap';

export default function WeatherPanel({ city, temperature, wind, code }) {
  return (
    <Card style={styles.card}>
      <Card.Content>
        <Text variant="titleLarge">{city}</Text>
        <Text style={styles.icon}>{weatherCodeMap[code] || "❓"}</Text>
        <View style={styles.row}>
          <Text style={styles.temp}>{temperature}°C</Text>
          <Text style={styles.wind}>{wind} km/h</Text>
        </View>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 16,
    padding: 16,
  },
  icon: {
    fontSize: 48,
    textAlign: 'center',
    marginVertical: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  temp: {
    fontSize: 24,
  },
  wind: {
    fontSize: 18,
    color: '#666',
  },
});
