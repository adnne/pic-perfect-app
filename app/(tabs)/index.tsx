import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  StatusBar,
  StyleSheet
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function HomeScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
 <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <ScrollView style={styles.scrollView}>

        {/* Tabs */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabsContainer}>
          <TouchableOpacity style={styles.activeTab}>
            <Text style={styles.activeTabText}>All types</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab}>
            <Text style={styles.tabText}>Images</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab}>
            <Text style={styles.tabText}>Videos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab}>
            <Text style={styles.tabText}>Content</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Feature Cards */}
        <View style={styles.cardsContainer}>
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
        </View>

        {/* Favorites Section */}
        <View style={styles.favoritesContainer}>
          <View style={styles.favoritesHeader}>
            <Text style={styles.favoritesTitle}>Favorites</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.favoriteItem}>
            <Image
              source={{ uri: 'https://via.placeholder.com/50' }}
              style={styles.favoriteItemImage}
            />
            <View style={styles.favoriteItemContent}>
              <Text style={styles.favoriteItemTitle}>Education feedback</Text>
              <Text style={styles.favoriteItemTime}>1m ago</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>

    </SafeAreaView>
   
  );
}

const styles =  StyleSheet.create( {
  container: {
    flex: 1,
    backgroundColor: '#F8F0FF',
    paddingTop:20
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  menuIcon: {
    fontSize: 24,
    color: '#4A0E4E',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  scrollView: {
    flex: 1,
  },
  greeting: {
    padding: 16,
  },
  greetingText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4A0E4E',
  },
  greetingName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4A0E4E',
  },
  tabsContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: '#4A0E4E',
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 20,
  },
  tabText: {
    color: '#4A0E4E',
  },
  activeTabText: {
    color: 'white',
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
  favoritesContainer: {
    padding: 16,
  },
  favoritesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  favoritesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A0E4E',
  },
  seeAllText: {
    color: '#007AFF',
  },
  favoriteItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
  },
  favoriteItemImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 12,
  },
  favoriteItemContent: {
    flex: 1,
  },
  favoriteItemTitle: {
    fontWeight: 'bold',
    color: '#4A0E4E',
  },
  favoriteItemTime: {
    color: '#8E8E93',
    fontSize: 12,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#4A0E4E',
    borderRadius: 30,
    margin: 16,
    padding: 12,
  },
  navItem: {
    alignItems: 'center',
  },
  navIcon: {
    fontSize: 24,
    color: 'white',
  },
})