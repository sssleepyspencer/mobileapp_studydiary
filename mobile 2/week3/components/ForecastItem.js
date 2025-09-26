import React from 'react';
import { List } from 'react-native-paper';

export default function ForecastItem({ item }) {
  return (
    <List.Item
      title={`${item.date} — ${item.temp}`}
      description={`Wind: ${item.wind}, ${item.desc}`}
      left={(props) => <List.Icon {...props} icon="weather-partly-cloudy" />}
    />
  );
}
