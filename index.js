/**
 * @format
 */

import {AppRegistry, PermissionsAndroid} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import TrackPlayer from 'react-native-track-player';

const requestFilePermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      {
        title: 'File permission',
        message:
          'Bliz launcher needs access to read your files' +
          'so it can play back music.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can read files');
    } else {
      console.log('File permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
};

setTimeout(requestFilePermission, 5000);

TrackPlayer.setupPlayer().then(() => {
  console.log('player ready');
  // The player is ready to be used
  var track = {
    id: 'test', // Must be a string, required
    url: 'file:///storage/emulated/0/Music/Jazz/test.mp3', // Load media from the file system
    // url: 'http://bliz.domj.net/files/music/Alarm01.wav', // Load media from the file system
    title: 'Jazz',
  };

  TrackPlayer.add(track).then(() => {
    console.log('track added');
    TrackPlayer.getCurrentTrack().then(trackName => console.log(trackName));
    TrackPlayer.play().then(() => {
      console.log('playing');
    });
  });
});

AppRegistry.registerComponent(appName, () => App);
TrackPlayer.registerPlaybackService(() => require('./service.js'));
