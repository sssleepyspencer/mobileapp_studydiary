import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import {
  TextInput,
  Button,
  Card,
  Title,
  Paragraph,
  Chip,
  Snackbar,
  Avatar,
  Divider,
} from 'react-native-paper';

export default function HomeScreen({ navigation }) {
  const [city, setCity] = useState('Tampere');
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const handleUpdate = () => {
    setSnackbarVisible(true);
  };

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
        onPress={handleUpdate}
        style={styles.button}
      >
        Update
      </Button>

      <Chip icon="map-marker" style={styles.chip}>
        Selected: {city}
      </Chip>

      <Divider style={styles.divider} />

      <Card>
        <Card.Title
          title={`Weather in ${city}`}
          left={(props) => <Avatar.Icon {...props} icon="weather-cloudy" />}
        />
        <Card.Content>
          <Paragraph>Temperature: 15°C</Paragraph>
          <Paragraph>Condition: Cloudy</Paragraph>
          <Paragraph>Wind: 3.5 m/s</Paragraph>
        </Card.Content>
      </Card>

      <Button
        mode="outlined"
        onPress={() => navigation.navigate('Forecast', { city })}
        style={styles.forecastButton}
      >
        Open Forecast
      </Button>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={2000}
      >
        City updated to {city}
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: { marginBottom: 10 },
  button: { marginBottom: 10 },
  chip: { marginBottom: 10 },
  divider: { marginVertical: 10 },
  forecastButton: { marginTop: 20 },
});
