// SplashScreen.js
import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './Navigation';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('MainScreen');
    }, 5000); 
  }, []);

  return (
    <View style={styles.container}>
      <Image source={{ uri: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fconstruccionesuce.wordpress.com%2Fci-fundaciones%2Flogo-uce%2F&psig=AOvVaw2JuwUScHmo7HeLrcC5bMJJ&ust=1708651510559000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCKiAxYTlvYQDFQAAAAAdAAAAABAE' }} style={styles.logo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 200, 
    height: 200, 
  },
});

export default SplashScreen;