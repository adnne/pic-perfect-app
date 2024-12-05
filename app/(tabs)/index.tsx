import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
  StyleSheet,
  FlatList
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { generatedImagesService } from '@/services/generated_images/api';
import { useFocusEffect } from '@react-navigation/native';

export default function HomeScreen() {
  const [imagesList, setImagesList] = useState<API.GenratedImage[]>([]);


  useFocusEffect(
    React.useCallback(() => {
      generatedImagesService.list().then((response) => {
        setImagesList(response.data.results);
      }).catch((error) => {
        console.log(error);
      });
    }, [])
  );
  const renderImageItem = ({ item }: { item: API.GenratedImage }) => (
    <View style={styles.imageItem}>
      <Image source={{ uri: item.image }} style={styles.generatedImage} />
      {/* <Text style={styles.imagePrompt} numberOfLines={2}>{item.prompt}</Text> */}
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient
        colors={['#1a1a2e', '#16213e']}
        style={{ flex: 1 ,}}
      >
        <View style={styles.container}>
          <StatusBar barStyle="default" />
          
          <ScrollView style={styles.scrollView}>
            {/* <View style={styles.cardsContainer}>
              <LinearGradient
                colors={['#8A2BE2', '#FF69B4']}
                style={styles.card}
              >
                <View style={styles.cardIcon}>
                  <Text style={styles.cardIconText}>💬</Text>
                </View>
                <Text style={styles.cardText}>Chat with the smartest AI</Text>
              </LinearGradient>

              <LinearGradient
                colors={['#00FA9A', '#00CED1']}
                style={styles.card}
              >
                <View style={styles.cardIcon}>
                  <Text style={styles.cardIconText}>{'</>'}</Text>
                </View>
                <Text style={styles.cardText}>HTML welcome from</Text>
              </LinearGradient>
            </View> */}

            <View style={styles.generatedImagesContainer}>
              <Text style={styles.sectionTitle}>Generated Images</Text>
              <FlatList
                data={imagesList}
                renderItem={renderImageItem}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
                showsHorizontalScrollIndicator={false}
              />
            </View>
          </ScrollView>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20
  },
  scrollView: {
    flex: 1,
  },
  cardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  card: {
    width: '48%',
    height: 120,
    borderRadius: 16,
    padding: 16,
    justifyContent: 'space-between',
  },
  cardIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardIconText: {
    color: 'white',
    fontSize: 16,
  },
  cardText: {
    color: 'white',
    fontWeight: 'bold',
  },
  generatedImagesContainer: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 12,
  },
  imageItem: {
    marginRight: 12,
    width: "48.5%",
  },
  generatedImage: {
    flex: 1,
    height: 150,
    borderRadius: 8,
    marginBottom: 8,
  },
  imagePrompt: {
    color: 'white',
    fontSize: 12,
    marginTop: 4,
  },
});