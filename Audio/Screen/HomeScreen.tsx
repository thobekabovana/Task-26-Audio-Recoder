import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import VoiceNoteList from './VoiceNoteList'; // Ensure correct import

const HomeScreen = ({ navigation }) => {
  const [voiceNotes, setVoiceNotes] = useState([]);

  useEffect(() => {
    const loadVoiceNotes = async () => {
      try {
        const storedNotes = await AsyncStorage.getItem('voiceNotes');
        setVoiceNotes(storedNotes ? JSON.parse(storedNotes) : []);
      } catch (error) {
        console.error('Error loading voice notes:', error);
      }
    };

    loadVoiceNotes();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Voice Notes</Text>
      <Button title="Start Recording" onPress={() => navigation.navigate('Record')} />
      <VoiceNoteList voiceNotes={voiceNotes} setVoiceNotes={setVoiceNotes} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default HomeScreen;
