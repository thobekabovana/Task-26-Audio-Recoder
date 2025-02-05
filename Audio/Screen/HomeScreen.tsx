import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import VoiceNoteList from '../components/VoiceNoteList';

const HomeScreen = ({ navigation }) => {
  const [voiceNotes, setVoiceNotes] = useState([]);

  useEffect(() => {
    // Fetch voice notes from AsyncStorage
    const loadVoiceNotes = async () => {
      const storedNotes = await AsyncStorage.getItem('voiceNotes');
      setVoiceNotes(storedNotes ? JSON.parse(storedNotes) : []);
    };

    loadVoiceNotes();
  }, []);

  return (
    <View>
      <Text>Voice Notes</Text>
      <Button title="Start Recording" onPress={() => navigation.navigate('Record')} />
      <VoiceNoteList voiceNotes={voiceNotes} />
    </View>
  );
};

export default HomeScreen;
