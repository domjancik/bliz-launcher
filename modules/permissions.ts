import {PermissionsAndroid} from 'react-native';

type callback = () => void;

export const requestFilePermission = async () => {
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
