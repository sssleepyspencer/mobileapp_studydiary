import React from 'react';
import { Card, Paragraph } from 'react-native-paper';

export default function WeatherCard({ weather }) {
  return (
    <Card>
      <Card.Title title={`Weather in ${weather.name}`} />
      <Card.Content>
        <Paragraph>Temperature: {weather.main.temp}°C</Paragraph>
        <Paragraph>Condition: {weather.weather[0].description}</Paragraph>
        <Paragraph>Wind: {weather.wind.speed} m/s</Paragraph>
      </Card.Content>
    </Card>
  );
}
