import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import {
  TextInput,
  Button,
  Snackbar,
  ActivityIndicator,
  Paragraph,
} from 'react-native-paper';
import WeatherCard from '../components/WeatherCard';

export default function WeatherScreen() {
  const [city, setCity] = useState('Tampere');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const fetchWeather = async () => {
    const apiKey = '95cc3708ed30e84a9e82cf9e8317e29c'; 
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    setLoading(true);
    setError('');
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.cod === 200) {
        setWeather(data);
        setSnackbarVisible(true);
      } else {
        setError(data.message);
        setWeather(null);
      }
    } catch (err) {
      setError('Network error');
      setWeather(null);
    } finally {
      setLoading(false);
    }
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
      <Button mode="contained" onPress={fetchWeather} style={styles.button}>
        Get Weather
      </Button>

      {loading && <ActivityIndicator animating={true} size="large" style={styles.loader} />}

      {error ? (
        <Paragraph style={styles.error}>Error: {error}</Paragraph>
      ) : (
        weather && <WeatherCard weather={weather} />
      )}

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={2000}
      >
        Weather updated for {city}
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: { marginBottom: 10 },
  button: { marginBottom: 10 },
  loader: { marginVertical: 20 },
  error: { color: 'red', marginVertical: 10 },
});
