// src/components/VoiceNoteList.js
import React from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import AsyncStorage from '@react-native-async-storage/async-storage';

const VoiceNoteList = ({ voiceNotes }) => {
  const audioRecorderPlayer = new AudioRecorderPlayer();

  const deleteVoiceNote = async (path) => {
    const updatedNotes = voiceNotes.filter((note) => note !== path);
    await AsyncStorage.setItem('voiceNotes', JSON.stringify(updatedNotes));
  };

  const playVoiceNote = async (path) => {
    await audioRecorderPlayer.startPlayer(path);
  };

  return (
    <FlatList
      data={voiceNotes}
      renderItem={({ item }) => (
        <View>
          <Text>{item}</Text>
          <Button title="Play" onPress={() => playVoiceNote(item)} />
          <Button title="Delete" onPress={() => deleteVoiceNote(item)} />
        </View>
      )}
      keyExtractor={(item) => item}
    />
  );
};

export default VoiceNoteList;
