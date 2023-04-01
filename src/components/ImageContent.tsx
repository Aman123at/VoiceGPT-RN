import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {IImages} from '../utils/types';

const ImageContent = ({type, title, id, url, navigation}: IImages) => {
  return (
    <View
      style={type === 's' ? styles.green : styles.pink}
      key={id ? id : Math.random() * 12345}>
      <View>
        <Text style={type === 's' ? styles.tagS : styles.tagR}>
          {type === 's' ? 'You' : 'GPT'}
        </Text>
        {type === 'r' ? (
          <Pressable onPress={() => navigation.navigate('ImageDepth', {url})}>
            <Image
              style={styles.image}
              source={{uri: url}}
              alt={id.toString()}
            />
          </Pressable>
        ) : (
          <Text style={type === 's' ? styles.text : styles.textReply}>
            {title}
          </Text>
        )}
      </View>
    </View>
  );
};

export default ImageContent;

const styles = StyleSheet.create({
  text: {
    color: 'black',
    paddingHorizontal: 8,
    fontSize: 15,
    paddingBottom: 2,
  },
  textReply: {
    color: 'black',
    paddingHorizontal: 8,
    fontSize: 15,
    paddingBottom: 2,
    width: 280,
  },
  speaker: {
    padding: 2,
  },
  green: {
    backgroundColor: 'lightgreen',

    flexDirection: 'row',
    maxWidth: 250,
    marginLeft: 'auto',
    borderRadius: 10,
    marginRight: 10,
    marginVertical: 4,
  },
  pink: {
    backgroundColor: '#F7CCD3',
    display: 'flex',
    flexDirection: 'row',

    maxWidth: 320,
    marginRight: 'auto',
    borderRadius: 10,
    marginLeft: 10,
    marginVertical: 4,
  },
  tagR: {
    fontWeight: 'bold',
    color: '#ff00ff',
    marginHorizontal: 5,
    marginTop: 2,
  },
  tagS: {
    fontWeight: 'bold',
    color: '#0000ff',
    marginHorizontal: 5,
    marginTop: 2,
  },
  image: {
    width: 256,
    height: 256,
    margin: 5,
    borderRadius: 10,
  },
});
