import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Platform,
  ActivityIndicator,
  KeyboardAvoidingView,
} from 'react-native';
import Header from '../components/Header';
import WeatherPanel from '../components/WeatherPanel';
import CityInput from '../components/CityInput';
import PrimaryButton from '../components/PrimaryButton';
import { MOCK_WEATHER } from '../utils/mockWeather';

export default function WeatherScreen() {
  const [city, setCity] = useState(MOCK_WEATHER.city);
  const [loading, setLoading] = useState(false);

  const handleClear = () => setCity('');
  const handleSubmit = () => console.log("Submitted:", city);
  const simulateLoading = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Header />
      <CityInput
        value={city}
        onChangeText={setCity}
        onClear={handleClear}
        onSubmit={handleSubmit}
      />
      <PrimaryButton title="Simulate Loading" onPress={simulateLoading} />
      {loading ? (
        <ActivityIndicator size="large" color="#6200ee" />
      ) : (
        <WeatherPanel
          city={city}
          temperature={MOCK_WEATHER.temperatureC}
          wind={MOCK_WEATHER.windKm}
          code={MOCK_WEATHER.code}
        />
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
