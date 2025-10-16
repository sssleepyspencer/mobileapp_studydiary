import React from 'react';
import { Card, Paragraph } from 'react-native-paper';

export default function WeatherCard({ weather, unit }) {
  const tempUnit = unit === 'imperial' ? '°F' : '°C';
  const windUnit = unit === 'imperial' ? 'mph' : 'm/s';

  return (
    <Card>
      <Card.Title title={`Weather in ${weather.name}`} />
      <Card.Content>
        <Paragraph>Temperature: {weather.main.temp}{tempUnit}</Paragraph>
        <Paragraph>Condition: {weather.weather[0].description}</Paragraph>
        <Paragraph>Wind: {weather.wind.speed} {windUnit}</Paragraph>
      </Card.Content>
    </Card>
  );
}
