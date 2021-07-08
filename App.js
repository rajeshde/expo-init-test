/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import {Camera} from 'expo-camera';
import { Video, AVPlaybackStatus } from 'expo-av';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
  Button,
  Platform,
  Image,
} from 'react-native';

import * as ImagePicker from 'expo-image-picker';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [image, setImage] = useState(null);

  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});

  // useEffect(() => {
  //   (async () => {
  //     const {status} = await Camera.requestPermissionsAsync();
  //     setHasPermission(status === 'granted');
  //   })();
  // }, []);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        try {
          const {status} =
            await ImagePicker.requestMediaLibraryPermissionsAsync();
            setHasPermission(status === 'granted');
        } catch (error) {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  // for-image-picker
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{uri: image}} style={{width: 200, height: 200}} />}
    </View>
  );

  // return (
  //   <View style={styles.container}>
  //     {/* <Camera style={styles.camera} type={type}>
  //       <View style={styles.buttonContainer}>
  //         <TouchableOpacity
  //           style={styles.button}
  //           onPress={() => {
  //             setType(
  //               type === Camera.Constants.Type.back
  //                 ? Camera.Constants.Type.front
  //                 : Camera.Constants.Type.back
  //             );
  //           }}>
  //           <Text style={styles.text}> Flip </Text>
  //         </TouchableOpacity>
  //       </View>
  //     </Camera> */}
  //     {/* <Video
  //       ref={video}
  //       style={styles.video}
  //       source={{
  //         uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
  //       }}
  //       useNativeControls
  //       resizeMode="contain"
  //       isLooping
  //       onPlaybackStatusUpdate={status => setStatus(() => status)}
  //     />
  //     <View style={styles.buttons}>
  //       <Button
  //         title={status.isPlaying ? 'Pause' : 'Play'}
  //         onPress={() =>
  //           status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
  //         }
  //       />
  //     </View> */}
  //   </View>
  // );
};

export default App;

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  // },
  // camera: {
  //   flex: 1,
  // },
  // buttonContainer: {
  //   flex: 1,
  //   backgroundColor: 'transparent',
  //   flexDirection: 'row',
  //   margin: 20,
  // },
  // button: {
  //   flex: 0.1,
  //   alignSelf: 'flex-end',
  //   alignItems: 'center',
  // },
  // text: {
  //   fontSize: 18,
  //   color: 'white',
  // },


  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  video: {
    alignSelf: 'center',
    width: 320,
    height: 200,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
