import React, { useState } from 'react';
import { View, Button, Text, Alert, StyleSheet } from 'react-native';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFS from 'react-native-fs';

const RecordingScreen = ({ navigation }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioPath, setAudioPath] = useState('');
  const audioRecorderPlayer = new AudioRecorderPlayer();

  const startRecording = async () => {
    try {
      const path = `${RNFS.DocumentDirectoryPath}/voice_${Date.now()}.m4a`;
      await audioRecorderPlayer.startRecorder(path);
      audioRecorderPlayer.addRecordBackListener((e) => {
        console.log('Recording position:', e.current_position);
      });
      setAudioPath(path);
      setIsRecording(true);
    } catch (error) {
      Alert.alert('Error', 'Failed to start recording');
      console.error(error);
    }
  };

  const stopRecording = async () => {
    try {
      const result = await audioRecorderPlayer.stopRecorder();
      setIsRecording(false);

      const storedNotes = await AsyncStorage.getItem('voiceNotes');
      const updatedNotes = storedNotes ? JSON.parse(storedNotes) : [];
      updatedNotes.push(result);
      await AsyncStorage.setItem('voiceNotes', JSON.stringify(updatedNotes));

      Alert.alert('Recording Saved', 'Your voice note has been saved.');
    } catch (error) {
      console.error('Error stopping recording:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.status}>{isRecording ? 'Recording...' : 'Not Recording'}</Text>
      <Button title={isRecording ? 'Stop Recording' : 'Start Recording'} onPress={isRecording ? stopRecording : startRecording} />
      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  status: {
    fontSize: 18,
    marginBottom: 20,
  },
});

export default RecordingScreen;
