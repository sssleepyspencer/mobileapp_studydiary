import React from 'react';
import { Button } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';

export default function PrimaryButton({ title, onPress, disabled }) {
  return (
    <View style={styles.wrapper}>
      <Button
        mode="contained"
        onPress={onPress}
        disabled={disabled}
        uppercase={false}
      >
        {title}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 12,
    marginHorizontal: 16,
  },
});
