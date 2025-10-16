import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Accelerometer } from 'expo-sensors';

export default function LevelScreen() {
  const [data, setData] = useState({ x: 0, y: 0, z: 0 });

  useEffect(() => {
    const subscription = Accelerometer.addListener(setData);
    return () => subscription.remove();
  }, []);

  const isLevel = Math.abs(data.x) < 0.05 && Math.abs(data.y) < 0.05;

  return (
    <View style={[styles.container, { backgroundColor: isLevel ? 'green' : 'red' }]}>
      <Text style={styles.text}>{isLevel ? 'Level' : 'Not Level'}</Text>
      <Text style={styles.details}>
        x: {data.x.toFixed(2)} | y: {data.y.toFixed(2)} | z: {data.z.toFixed(2)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 32, color: 'white', fontWeight: 'bold' },
  details: { fontSize: 16, color: 'white', marginTop: 10 },
});
