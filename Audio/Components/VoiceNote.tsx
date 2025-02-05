import React from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import AsyncStorage from '@react-native-async-storage/async-storage';

const VoiceNoteList = ({ voiceNotes, setVoiceNotes }) => {
  const audioRecorderPlayer = new AudioRecorderPlayer();

  const deleteVoiceNote = async (path) => {
    const updatedNotes = voiceNotes.filter((note) => note !== path);
    await AsyncStorage.setItem('voiceNotes', JSON.stringify(updatedNotes));
    setVoiceNotes(updatedNotes);
  };

  const playVoiceNote = async (path) => {
    try {
      await audioRecorderPlayer.startPlayer(path);
    } catch (error) {
      console.error('Error playing audio:', error);
    }
  };

  return (
    <FlatList
      data={voiceNotes}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Text style={styles.text}>{item}</Text>
          <Button title="Play" onPress={() => playVoiceNote(item)} />
          <Button title="Delete" color="red" onPress={() => deleteVoiceNote(item)} />
        </View>
      )}
      keyExtractor={(item) => item}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  text: {
    fontSize: 16,
  },
});

export default VoiceNoteList;
