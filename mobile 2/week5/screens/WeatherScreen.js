import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import {
  TextInput,
  Button,
  Snackbar,
  ActivityIndicator,
  Paragraph,
  RadioButton,
} from 'react-native-paper';
import WeatherCard from '../components/WeatherCard';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function WeatherScreen() {
  const [city, setCity] = useState('Tampere');
  const [unit, setUnit] = useState('metric');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const navigation = useNavigation();

  const apiKey = '95cc3708ed30e84a9e82cf9e8317e29c';

  // Automatic loading settings
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const savedCity = await AsyncStorage.getItem('city');
        const savedUnit = await AsyncStorage.getItem('unit');
        if (savedCity) setCity(savedCity);
        if (savedUnit) setUnit(savedUnit);
      } catch (err) {
        console.log('Failed to load settings:', err);
      }
    };
    loadSettings();
  }, []);

  // Save setting
  const saveSettings = async () => {
    try {
      await AsyncStorage.setItem('city', city);
      await AsyncStorage.setItem('unit', unit);
      setSnackbarVisible(true);
    } catch (err) {
      console.log('Failed to save settings:', err);
    }
  };

  const fetchWeather = async () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`;
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

  const getLocationWeather = async () => {
    setLoading(true);
    setError('');
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setError('Location permission denied');
        setLoading(false);
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${unit}&appid=${apiKey}`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.cod === 200) {
        setWeather(data);
        setCity(data.name);
        setSnackbarVisible(true);
      } else {
        setError(data.message);
        setWeather(null);
      }
    } catch (err) {
      setError('Location fetch error');
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

      <RadioButton.Group onValueChange={setUnit} value={unit}>
        <View style={styles.radioRow}>
          <RadioButton value="metric" />
          <Paragraph>Metric (°C, m/s)</Paragraph>
        </View>
        <View style={styles.radioRow}>
          <RadioButton value="imperial" />
          <Paragraph>Imperial (°F, mph)</Paragraph>
        </View>
      </RadioButton.Group>

      <Button mode="contained" onPress={fetchWeather} style={styles.button}>
        Get Weather
      </Button>
      <Button mode="outlined" onPress={getLocationWeather} style={styles.button}>
        Use Current Location
      </Button>
      <Button mode="text" onPress={saveSettings} style={styles.button}>
        Save Settings
      </Button>
      <Button mode="outlined" onPress={() => navigation.navigate('Camera')} style={styles.button}>
        Open Camera
      </Button>

      {loading && <ActivityIndicator animating={true} size="large" style={styles.loader} />}

      {error ? (
        <Paragraph style={styles.error}>Error: {error}</Paragraph>
      ) : (
        weather && <WeatherCard weather={weather} unit={unit} />
      )}

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={2000}
      >
        Settings saved and weather updated for {city}
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
  radioRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 5 },
});