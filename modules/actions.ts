import {Linking, ToastAndroid} from 'react-native';

interface ActionContainer {
  [key: string]: (arg: string) => void;
}

const actions: ActionContainer = {
  url(url) {
    if (url) {
      Linking.openURL(url);
    } else {
      ToastAndroid.show('No link specified', 1000);
    }
  },

  skypevideocall(skypeUsername) {
    if (skypeUsername) {
      Linking.openURL(`skype:${skypeUsername}?call&amp;video=true`);
    } else {
      ToastAndroid.show('No username specified', 1000);
    }
  },
  skypecall(skypeUsername) {
    if (skypeUsername) {
      Linking.openURL(`skype:${skypeUsername}?call`);
    } else {
      ToastAndroid.show('No username specified', 1000);
    }
  },
};

export default actions;
