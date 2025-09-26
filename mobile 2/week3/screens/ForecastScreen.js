import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import ForecastItem from '../components/ForecastItem';

const mockForecast = [
  { id: '1', date: '2025-09-27 09:00', temp: '14°C', wind: '3.2 m/s', desc: 'Cloudy' },
  { id: '2', date: '2025-09-27 12:00', temp: '16°C', wind: '2.8 m/s', desc: 'Sunny' },
  { id: '3', date: '2025-09-27 15:00', temp: '17°C', wind: '3.0 m/s', desc: 'Partly cloudy' },
];

export default function ForecastScreen({ route }) {
  const { city } = route.params;

  return (
    <View style={styles.container}>
      <FlatList
        data={mockForecast}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ForecastItem item={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
});
