// App.js - Copy and paste this entire file
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, Image } from 'react-native';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('home');

  // Your images (make sure they are in the same folder as App.js)
  const screens = {
    home: require('../Home.png'),
    membership1: require('../membership1.png'),
    membership2: require('../membership2.png'),
    checkin: require('../checkin.png'),
    confirmation: require('./confirmation.png'), // not used yet, but ready if you want
  };

  // Toggle between membership1 and membership2 when membership tab is pressed
  const handleMembershipPress = () => {
    setCurrentScreen(prev => prev === 'membership1' ? 'membership2' : 'membership1');
  };

  const handleCheckInBarPress = () => {
    setCurrentScreen('checkin');
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Main Image Background */}
      <ImageBackground
        source={screens[currentScreen]}
        style={styles.backgroundImage}
        resizeMode="cover"
      >

        {/* Big Check-in Bar in the middle - only show on home screen */}
        {currentScreen === 'home' && (
          <TouchableOpacity style={styles.checkInBar} onPress={handleCheckInBarPress}>
            <View style={styles.checkInContent}>
              <Image source={require('./checkin.png')} style={styles.qrIcon} resizeMode="contain" />
              <Text style={styles.checkInText}>Check-in</Text>
            </View>
            <Text style={styles.checkInSubtitle}>
              Quickly scan your QR code, barcode, or share your membership details to check-in.
            </Text>
          </TouchableOpacity>
        )}

        {/* Bottom Navigation Bar */}
        <View style={styles.bottomNav}>
          {/* Home Button */}
          <TouchableOpacity
            style={styles.navItem}
            onPress={() => setCurrentScreen('home')}
          >
            <Image source={require('./Home.png')} style={[styles.navIcon, currentScreen === 'home' && styles.activeIcon]} />
            <Text style={[styles.navText, currentScreen === 'home' && styles.activeText]}>Home</Text>
          </TouchableOpacity>

          {/* Membership Button */}
          <TouchableOpacity
            style={styles.navItem}
            onPress={handleMembershipPress}
          >
            <Image source={require('./membership1.png')} style={[styles.navIconSmall, styles.navIcon]} />
            <Text style={styles.navText}>Membership</Text>
          </TouchableOpacity>

          {/* Facilities Button - Does Nothing */}
          <TouchableOpacity style={styles.navItem}>
            <Text style={styles.navText}>Facilities</Text>
          </TouchableOpacity>

          {/* Check-in Button */}
          <TouchableOpacity
            style={styles.navItem}
            onPress={() => setCurrentScreen('checkin')}
          >
            <Image source={require('./checkin.png')} style={[styles.navIconSmall, styles.navIcon]} />
            <Text style={[styles.navText, currentScreen === 'checkin' && styles.activeText]}>Check-in</Text>
          </TouchableOpacity>

          {/* Profile Button - Does Nothing */}
          <TouchableOpacity style={styles.navItem}>
            <Image source={require('./confirmation.png')} style={[styles.navIconSmall, styles.navIcon]} />
            <Text style={styles.navText}>Profile</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  checkInBar: {
    position: 'absolute',
    top: 180,
    left: 20,
    right: 20,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  checkInContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  qrIcon: {
    width: 40,
    height: 40,
    marginRight: 15,
  },
  checkInText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  checkInSubtitle: {
    marginTop: 8,
    color: '#666',
    fontSize: 14,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 90,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  navIcon: {
    width: 28,
    height: 28,
    marginBottom: 4,
  },
  navIconSmall: {
    width: 24,
    height: 24,
  },
  activeIcon: {
    tintColor: '#007AFF',
  },
  navText: {
    color: '#888',
    fontSize: 12,
  },
  activeText: {
    color: '#007AFF',
    fontWeight: 'bold',
  },
});