import { Platform } from 'react-native';
import { View, TextInput, Button, StyleSheet } from 'react-native';

export default function CityInput({ value, onChangeText, onClear, onSubmit }) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter city"
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
      />
      <Button title="Clear" onPress={onClear} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 12,
    padding: Platform.select({ ios: 16, android: 12 }),
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#aaa',
    padding: 8,
    borderRadius: 4,
  },
});
