import React, { useRef, useState } from 'react';
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
  ActivityIndicator,
  TouchableWithoutFeedback,
  ScrollView,
  Platform,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImageManipulator from 'expo-image-manipulator';
import * as ImagePicker from 'expo-image-picker';
import Button from '@/components/ui/Button';
import { generatedImagesService } from '@/services/generated_images/api';
import { router, useFocusEffect } from 'expo-router';
import { Formik, FormikProps } from 'formik';
import {Picker} from '@react-native-picker/picker';

type ImageSourceType = 'library' | 'camera';
type generatForm = {
  prompt: string;
  input_image: string;
  gender: string;
}
const TrendyPromptImagePage = () => {
  const [prompt, ] = useState('');
  const [input_image, setinput_image] = useState('');
  const [generated_image, setgenerated_image] = useState('');
  const [gender, setGender] = useState('');
  const [uploadImageModal, setUploadImageModal] = useState(false);
  const formikRef = useRef<FormikProps<generatForm>>(null);

  const [loading, setLoading] = useState(false);

  const submitForm = (values: generatForm) => {

    const msg = gender + ' img ' + values.prompt;
    const formData: API.GenratedImageForm = {
      input_image,
      prompt: msg,
    };
    setLoading(true);
    generatedImagesService.post(formData)
      .then((response) => {
        console.log(response.data);
        
        setgenerated_image(response.data.image_url);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error submitting data:', error);
        Alert.alert('Error', 'Failed to submit data. Please try again.');
      }).finally(() => {
        setLoading(false);
      })
    

  };

  const ImageEventFunction = async (sourceType: ImageSourceType) => {
    const { status } = sourceType === 'library' 
      ? await ImagePicker.requestMediaLibraryPermissionsAsync()
      : await ImagePicker.requestCameraPermissionsAsync();
    console.log(status);
    
    if (status !== 'granted') {
      Alert.alert('Permission denied', sourceType === 'library' 
        ? 'Sorry, we need gallery permissions to make this work!'
        : 'Sorry, we need camera permissions to make this work!'
      );
      return;
    }

    const mediaOptions = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    } as ImagePicker.ImagePickerOptions;

    const res = sourceType === 'library'
      ? await ImagePicker.launchImageLibraryAsync(mediaOptions)
      : await ImagePicker.launchCameraAsync(mediaOptions);

    if (!res.canceled && res.assets && res.assets.length > 0) {
      const result = res.assets[0];
      if (result.uri) {
        let imageManipResult = null;

        if (result.height > 800) {
          imageManipResult = await ImageManipulator.manipulateAsync(
            result.uri,
            [{ resize: { height: 800 } }],
            { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
          );
        } else {
          imageManipResult = await ImageManipulator.manipulateAsync(
            result.uri,
            [],
            { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
          );
        }

        setinput_image(imageManipResult.uri);
      }
    }
    setUploadImageModal(false);
  };

  useFocusEffect(
    React.useCallback(() => {
      formikRef.current?.resetForm();
    }, [])
  );
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' ,    backgroundColor: '#1a1a2e',
      }}>
        <Text style={{ color: 'white', marginBottom: 20 }}>Generating image...</Text>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    )
    
  }

  return (
    <>
      <Modal
        visible={uploadImageModal}
        animationType="slide"
        transparent
      >
        <BlurView tint="dark" style={{ flex: 1 }}>
          <View style={styles.modalContent}>
            <Button title="Photo library" onPress={() => ImageEventFunction('library')} />
            <Button title="Camera" onPress={() => ImageEventFunction('camera')} />
            <Button 
              title="Cancel" 
              style={{ backgroundColor: '#f43f5e' }} 
              textStyle={{ color: 'white' }} 
              onPress={() => setUploadImageModal(false)} 
            />
          </View>
        </BlurView>
      </Modal>
      <LinearGradient
          colors={['#1a1a2e', '#16213e']}
          style={styles.gradient}
        >
      <ScrollView  style={styles.container} >
        <StatusBar barStyle="light-content" />
       
          <Text style={styles.title}>AI Photo Generatore</Text>
         
          <Formik
          innerRef={formikRef}
          initialValues={{
            prompt: '',
            input_image: '',
            gender: '',
          }}
          onSubmit={(values) => submitForm(values)} 
          validate={(values) => {
            const errors: any = {};
            if (!values.prompt && !input_image) {
              errors.prompt = 'Both a prompt and an image must be provided';
            } else if (!values.prompt) {
              errors.prompt = 'Please provide a prompt';
            } else if (!input_image) {
              errors.prompt = 'Please provide an image';
            }
            
            return errors;
          }}
          >
          {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
            <View >
      <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter your prompt here"
              placeholderTextColor="#a0a0a0"
              onChangeText={handleChange('prompt')}
              onBlur={handleBlur('prompt')}
              value={values.prompt}
            />
          </View>
            {errors.prompt && <Text style={styles.error}>{errors.prompt}</Text>}
          <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={values.gender}
                  onValueChange={handleChange('gender')}>
                <Picker.Item label="Men" value="men" />
                <Picker.Item label="Women" value="women" />
              </Picker>
          </View>
          
          <TouchableOpacity style={styles.imageUploadButton} onPress={() => setUploadImageModal(true)}>
            <Text style={styles.buttonText}>Upload Image</Text>
          </TouchableOpacity>
          
          {input_image && (
            <Image
              source={{ uri: input_image }}
              style={styles.imagePreview}
            />
          )}

    
          
          <TouchableOpacity style={styles.submitButton} onPress={()=>handleSubmit()}>
            <LinearGradient
              colors={['#0f3443', '#34e89e']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}
              style={styles.submitGradient}
            >
              <Text style={styles.submitButtonText}>Generate</Text>
              
            </LinearGradient>
            
          </TouchableOpacity>
          {generated_image && (
            <Image
              source={{ uri: generated_image }}
              style={styles.imagePreview}
            />
          )}
            </View>
          )}
          
          </Formik>
      </ScrollView>
        </LinearGradient>
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
    marginTop: 20,
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
  modalContent: {
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
  },
  pickerContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    overflow: 'hidden',
  },
  picker: {
    color: '#fff',
    height: 50,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default TrendyPromptImagePage;