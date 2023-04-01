import {View, Text, StyleSheet, Image, Pressable} from 'react-native';
import React from 'react';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import {getLoaderState} from '../redux/slices/commonSlice';
import {HomeScreenProps} from '../utils/types';

const Header = ({navigation}: HomeScreenProps) => {
  const loader = useSelector(getLoaderState);
  return (
    <View style={styles.body}>
      <View style={styles.left}>
        <Image
          style={styles.img}
          source={require('../SplashScreen/mic2.jpg')}
          alt="MIC_ICON"
        />
        <Text style={styles.text}>Voice GPT</Text>
      </View>
      {!loader && (
        <View style={styles.icon}>
          <Pressable onPress={() => navigation.navigate('Image')}>
            <IonIcons name="image-outline" size={30} color="white" />
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  body: {
    backgroundColor: 'black',
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  left: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  img: {
    width: 50,
    height: 50,
    borderRadius: 999,
  },
  text: {
    fontSize: 25,
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  icon: {
    marginLeft: 10,
    marginRight: 10,
  },
});
