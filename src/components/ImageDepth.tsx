import {
  Image,
  PermissionsAndroid,
  Platform,
  Pressable,
  StyleSheet,
  ToastAndroid,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import RNFetchBlob from 'rn-fetch-blob';
const ImageDepth = ({navigation, route}: any) => {
  let routeParameters: any = route.params;
  const [showHeader, setShowHeader] = useState<boolean>(true);
  useEffect(() => {
    if (showHeader) {
      setTimeout(() => {
        setShowHeader(!showHeader);
      }, 5000);
    }
  }, [showHeader]);

  const showToastWithGravityAndOffset = (message: string) => {
    ToastAndroid.showWithGravityAndOffset(
      message,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50,
    );
  };

  const checkPermission = async () => {
    // Function to check the platform
    // If iOS then start downloading
    // If Android then ask for permission

    if (Platform.OS === 'ios') {
      downloadImage(routeParameters.url);
    } else {
      try {
        const granted: any = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // Once user grant the permission start downloading
          console.log('Storage Permission Granted.');
          downloadImage(routeParameters.url);
        } else {
          // If permission denied then show alert

          showToastWithGravityAndOffset('storage Permission Not Granted');
        }
      } catch (err) {
        // To handle permission related exception
        showToastWithGravityAndOffset('Permission denied.');
      }
    }
  };

  const downloadImage = (image_URL: string) => {
    let date = new Date();
    let ext: any = getExtention(image_URL);
    ext = '.' + ext[0];
    const {config, fs} = RNFetchBlob;
    let PictureDir = fs.dirs.PictureDir;
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        // Related to the Android only
        useDownloadManager: true,
        notification: true,
        path:
          PictureDir +
          '/image_' +
          Math.floor(date.getTime() + date.getSeconds() / 2) +
          ext,
        description: 'Image',
      },
    };
    config(options)
      .fetch('GET', image_URL)
      .then(res => {
        // Showing alert after successful downloading
        console.log('res -> ', JSON.stringify(res));
        showToastWithGravityAndOffset('Image Downloaded.');
      })
      .catch((err: any) => console.log(err));
  };

  const getExtention = (filename: string) => {
    // To get the file extension
    return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;
  };

  const handleDownloadImage = () => {
    checkPermission();
    navigation.navigate('Image');
  };

  return (
    <View style={styles.body}>
      {showHeader && (
        <View style={styles.header}>
          <Pressable onPress={() => navigation.navigate('Image')}>
            <MaterialIcons name="arrow-back" size={35} color="white" />
          </Pressable>
          <Pressable onPress={() => handleDownloadImage()}>
            <MaterialIcons name="file-download" size={35} color="white" />
          </Pressable>
        </View>
      )}
      <Pressable
        style={styles.image}
        onPress={() => setShowHeader(!showHeader)}>
        <Image
          style={styles.image}
          resizeMode="contain"
          source={{uri: routeParameters.url}}
        />
      </Pressable>
    </View>
  );
};

export default ImageDepth;

const styles = StyleSheet.create({
  body: {
    backgroundColor: 'black',
    flex: 1,
    position: 'relative',
  },
  header: {
    position: 'absolute',
    paddingHorizontal: 10,
    paddingVertical: 15,
    top: 0,
    width: '100%',
    backgroundColor: '#333',
    zIndex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  image: {
    flex: 1,
  },
});
