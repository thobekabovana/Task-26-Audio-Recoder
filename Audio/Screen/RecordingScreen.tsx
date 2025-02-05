import React, { useState } from 'react';
import { View, Button, Text } from 'react-native';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';

const RecordingScreen = ({ navigation }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioPath, setAudioPath] = useState('');
  const audioRecorderPlayer = new AudioRecorderPlayer();

  const startRecording = async () => {
    const path = 'hello.m4a'; // You can set the file name and location here
    await audioRecorderPlayer.startRecorder(path);
    audioRecorderPlayer.addRecordBackListener((e) => {
      console.log(e.current_position);
    });
    setAudioPath(path);
    setIsRecording(true);
  };

  const stopRecording = async () => {
    await audioRecorderPlayer.stopRecorder();
    setIsRecording(false);
  };

  return (
    <View>
      <Text>{isRecording ? 'Recording...' : 'Not Recording'}</Text>
      <Button
        title={isRecording ? 'Stop Recording' : 'Start Recording'}
        onPress={isRecording ? stopRecording : startRecording}
      />
      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default RecordingScreen;
