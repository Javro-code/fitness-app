import React, { useState } from 'react';
import { View, ImageBackground, StatusBar, StyleSheet, Platform, Pressable, Text } from 'react-native';

const HOME_IMAGE        = require('./assets/Home.png');
const MEMBERSHIP1_IMAGE = require('./assets/Membership1.png');
const MEMBERSHIP2_IMAGE = require('./assets/Membership2.png');
const CHECKIN_IMAGE     = require('./assets/Checkin.png');
const CONFIRMATION_IMAGE = require('./assets/Confirmation.png');

export default function App() {
  const [currentImage, setCurrentImage] = useState(HOME_IMAGE);

  const goHome        = () => setCurrentImage(HOME_IMAGE);
  const goMembership1 = () => setCurrentImage(MEMBERSHIP1_IMAGE);
  const goMembership2 = () => setCurrentImage(MEMBERSHIP2_IMAGE);
  const goCheckin     = () => setCurrentImage(CHECKIN_IMAGE);
  const goConfirmation = () => setCurrentImage(CONFIRMATION_IMAGE);

  const now = new Date();
  const time = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false });
  const date = now.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }).replace(' ', ' '); // "9 Dec 2025"

  return (
    <View style={styles.container}>
      <StatusBar barStyle={Platform.OS === 'android' ? 'light-content' : 'dark-content'} />

      <ImageBackground source={currentImage} style={styles.image} resizeMode="cover" />

      {currentImage === HOME_IMAGE && (
        <Pressable onPress={goCheckin} style={styles.homeCheckinHotspot} />
      )}

      {currentImage === MEMBERSHIP1_IMAGE && (
        <Pressable onPress={goMembership2} style={styles.membership1HeaderHotspot} />
      )}
      {currentImage === MEMBERSHIP2_IMAGE && (
        <Pressable onPress={goMembership1} style={styles.membership2HeaderHotspot} />
      )}

      {currentImage === CHECKIN_IMAGE && (
        <Pressable onPress={goConfirmation} style={styles.checkinMiddleHotspot} />
      )}

      {currentImage === CONFIRMATION_IMAGE && (
        <>
          <Pressable onPress={goHome} style={styles.confirmationBackHotspot} />
          <Pressable onPress={goHome} style={styles.confirmationDoneHotspot} />

          <View style={styles.confirmationTextOverlay}>
            <Text style={styles.timeText}>Checked in at {time}</Text>
            <Text style={styles.dateText}>on</Text>
            <Text style={styles.dateText}>{date}</Text>
          </View>
        </>
      )}

      <View style={styles.bottomTouchRow}>
        <Pressable style={styles.touchCell} onPress={goHome} />
        <Pressable style={styles.touchCell} onPress={goMembership1} />
        <Pressable style={styles.touchCell} />
        <Pressable style={styles.touchCell} onPress={goCheckin} />
        <Pressable style={styles.touchCell} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  image: { flex: 1, width: '100%', height: '100%' },

  bottomTouchRow: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 80, flexDirection: 'row' },
  touchCell: { flex: 1 },

  homeCheckinHotspot: { position: 'absolute', top: 280, left: 24, right: 24, height: 80 },
  checkinMiddleHotspot: { position: 'absolute', top: 180, left: 40, right: 40, height: 300 },

  confirmationBackHotspot: { position: 'absolute', top: 30, left: 10, width: 70, height: 70 },
  confirmationDoneHotspot: { position: 'absolute', bottom: 70, left: 30, right: 30, height: 90 },

  confirmationTextOverlay: {
    position: 'absolute',
    top: 440,
    width: '100%',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 22,
    color: '#000',
    fontWeight: 'normal',
  },
  dateText: {
    fontSize: 22,
    color: '#000',
    fontWeight: 'normal',
    lineHeight: 28,
  },

  membership1HeaderHotspot: { position: 'absolute', top: 140, left: 24, right: 24, height: 80 },
  membership2HeaderHotspot: { position: 'absolute', top: 140, left: 24, right: 24, height: 80 },
});