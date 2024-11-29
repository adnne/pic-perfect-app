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
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {  MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImageManipulator from 'expo-image-manipulator';
import * as ImagePicker from 'expo-image-picker';
import { useActionSheet } from '@expo/react-native-action-sheet';

const TrendyPromptImagePage = () => {
  const [prompt, setPrompt] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = () => {
    if (prompt.trim() === '' || !image) {
      Alert.alert('Incomplete', 'Please enter a prompt and upload an image.');
    } else {
      Alert.alert('Success', 'Prompt and image submitted successfully!');
    }
  };

  const { showActionSheetWithOptions } = useActionSheet();

  const openActionSheet = () => {
    console.log('openActionSheet');
    
    try {
      showActionSheetWithOptions(
        {
          options: ['Camera', 'Gallery', 'Cancel'],
          destructiveButtonIndex: 0,
          cancelButtonIndex: 2,
          icons: [
            <MaterialCommunityIcons name="camera" size={20} />,
            <MaterialCommunityIcons name="image-multiple" size={20} />,
            <MaterialCommunityIcons name="chevron-left" size={20} />,
          ],
          title: 'Pick image',
          useModal: true,
          destructiveColor: 'black',
        },
        (i) => {
          switch (i) {
            case 0:
              tackeImage();
              break;
            case 1:
              pickImage();
              break;
  
            default:
              break;
          }
        },
      );
    } catch (error) {
      console.log(error);
      
    }
    
    
  };
  const pickImage = async () => {
    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      // allowsEditing: true,
      // aspect: [4, 4],
      quality: 1,
    });
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

          console.log(imageManipResult.uri);
        }
      }
    }
  };

  const tackeImage = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Sorry, we need camera permissions to make this work!');
      return;
    }

    const res = await ImagePicker.launchCameraAsync({
      mediaTypes: ['images'],
      // allowsEditing: true,
      // aspect: [4, 4],
      quality: 1,
    });

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

          console.log(imageManipResult.uri);
        }
      }
    }
  };
  return (
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
        
        <TouchableOpacity style={styles.imageUploadButton} onPress={openActionSheet}>
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