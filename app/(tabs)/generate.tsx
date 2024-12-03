import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  Alert,
  SafeAreaView,
  StatusBar,
  Modal,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import {  MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImageManipulator from 'expo-image-manipulator';
import * as ImagePicker from 'expo-image-picker';
import Button from '@/components/ui/Button';
type ImageSourceType = 'library' | 'camera';

const TrendyPromptImagePage = () => {
  const [prompt, setPrompt] = useState('');
  const [image, setImage] = useState('');
  const [uploadImageModal, setUploadImageModal] = useState(false);

  const handleSubmit = () => {
    if (prompt.trim() === '' || !image) {
      Alert.alert('Incomplete', 'Please enter a prompt and upload an image.');
    } else {
      Alert.alert('Success', 'Prompt and image submitted successfully!');
    }
  };

  const ImageEventFunction = async (sourceType:ImageSourceType) => {
    const { status } = sourceType === 'library' 
      ? await ImagePicker.requestMediaLibraryPermissionsAsync()
      : await ImagePicker.requestCameraPermissionsAsync();

    if (status !== 'granted') {
      if (sourceType === 'library') {
        Alert.alert('Sorry, we need galery permissions to make this work!');
      } else {
        Alert.alert('Sorry, we need camera permissions to make this work!');
      }
      return;
    }
    const mediaOptions ={
      mediaTypes: ['images'],
      quality: 1,
    } as ImagePicker.ImagePickerOptions

    const res = sourceType === 'library'
    ? await ImagePicker.launchImageLibraryAsync(mediaOptions)
    : await ImagePicker.launchCameraAsync(mediaOptions);

    if (!res.canceled) {
      const result = res.assets[0];
      if (result) {
        if (result.uri) {
          let imageManipResult = null;

          if (result.height > 800) {
            // Compressing the image
            imageManipResult = await ImageManipulator.manipulateAsync(
              result.uri,
              [{ resize: { height: 800 } }],
              { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG },
            );
          } else {
            imageManipResult = await ImageManipulator.manipulateAsync(
              result.uri,
              [],
              { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG },
            );
          }

          setImage(imageManipResult.uri);

        }
      }
    }
    setUploadImageModal(false)
  }


  return (
    <> 
      <Modal
        visible={uploadImageModal}
        animationType='slide'
        transparent
      >
        <BlurView  tint='dark'  style={{ flex: 1} }>
          <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
            position: 'absolute',
            left: 10,
            right: 10,
            bottom: 20,
            height: 200,
            borderRadius: 20,
            display: 'flex',
            gap: 10,
            paddingHorizontal: 20
          }} >
            <Button title='Photo libray' onPress={()=>ImageEventFunction('library')} />
            <Button title='Camera' onPress={()=>ImageEventFunction('camera')} />
            <Button title='Cancel' style={{ backgroundColor: '#f43f5e' }} textStyle={{ color: 'white' }} onPress={() => setUploadImageModal(false)} />
          </View>
        </BlurView>
       
      </Modal>
    <SafeAreaView style={styles.container}>
 
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={['#1a1a2e', '#16213e']}
        style={styles.gradient}
      >
        <Text style={styles.title}>AI Prompt Creator</Text>
        
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter your prompt here"
            placeholderTextColor="#a0a0a0"
            value={prompt}
            onChangeText={setPrompt}
            multiline
          />
        </View>
        
        <TouchableOpacity style={styles.imageUploadButton} onPress={()=>setUploadImageModal(true)}>
          <Text style={styles.buttonText}>Upload Image</Text>
        </TouchableOpacity>
        
        {image && (
          <Image
            source={{ uri: image }}
            style={styles.imagePreview}
          />
        )}
        
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <LinearGradient
            colors={['#0f3443', '#34e89e']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={styles.submitGradient}
          >
            <Text style={styles.submitButtonText}>Generate</Text>
          </LinearGradient>
        </TouchableOpacity>
      </LinearGradient>
    </SafeAreaView>
    </>
   
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#fff',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10
  },
  inputContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  input: {
    padding: 15,
    fontSize: 16,
    minHeight: 120,
    textAlignVertical: 'top',
    color: '#fff',
  },
  imageUploadButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  submitButton: {
    borderRadius: 25,
    overflow: 'hidden',
  },
  submitGradient: {
    padding: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  imagePreview: {
    width: '100%',
    height: 200,
    borderRadius: 15,
    marginBottom: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
});

export default TrendyPromptImagePage;