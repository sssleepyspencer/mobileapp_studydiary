import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Title } from 'react-native-paper';
import * as Linking from 'expo-linking';

export default function LinkingScreen() {
  const callPhone = () => Linking.openURL('tel:+358401234567');
  const openMap = () => Linking.openURL('https://www.google.com/maps?q=60.192059,24.945831');
  const sendEmail = () => Linking.openURL('mailto:test@example.com?subject=Hello&body=This is a test email.');
  const openWeb = () => Linking.openURL('https://www.tuni.fi');

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Device Intent Actions</Title>
      <Button mode="contained" onPress={callPhone} style={styles.button}>Call Phone</Button>
      <Button mode="contained" onPress={openMap} style={styles.button}>Open Map</Button>
      <Button mode="contained" onPress={sendEmail} style={styles.button}>Send Email</Button>
      <Button mode="contained" onPress={openWeb} style={styles.button}>Open Website</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, gap: 10 },
  title: { marginBottom: 20, textAlign: 'center' },
  button: { marginVertical: 5 },
});
