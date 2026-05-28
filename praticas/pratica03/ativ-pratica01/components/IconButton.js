import { Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 

export default function IconButton({ icon, size, color, onPress }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => pressed && styles.pressed}>
      <Ionicons name={icon} size={size} color={color} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.7, 
  },
});