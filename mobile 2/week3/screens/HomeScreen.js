import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Card, Title, Paragraph } from 'react-native-paper';

export default function HomeScreen({ navigation }) {
  const [city, setCity] = useState('Tampere');

  return (
    <View style={styles.container}>
      <TextInput
        label="City"
        value={city}
        onChangeText={setCity}
        mode="outlined"
        style={styles.input}
      />
      <Button
        mode="contained"
        onPress={() => navigation.navigate('Forecast', { city })}
        style={styles.button}
      >
        Open Forecast
      </Button>

      <Card>
        <Card.Content>
          <Title>Weather in {city}</Title>
          <Paragraph>Temperature: 15°C</Paragraph>
          <Paragraph>Condition: Cloudy</Paragraph>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: { marginBottom: 10 },
  button: { marginBottom: 20 },
});
