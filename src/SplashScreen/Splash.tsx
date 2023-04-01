import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';

const Splash = () => {
  return (
    <View style={styles.body}>
      <Image
        style={styles.img}
        source={require('../SplashScreen/mic2.jpg')}
        alt="MIC_ICON"
      />
      <Text style={styles.texts}>Voice Gpt</Text>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  body: {
    backgroundColor: 'black',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  texts: {
    color: 'white',
    marginTop: 20,
    fontSize: 35,
    fontWeight: '500',
  },
  img: {
    width: 200,
    height: 200,
    borderRadius: 999,
  },
});
