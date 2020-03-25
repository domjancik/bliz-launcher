import React from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  Linking,
  ToastAndroid,
} from 'react-native';
import LauncherItem from '../../model/launcher-item.model';

export interface LauncherIconProps {
  item: LauncherItem;
}

const width = 115;
const height = width + 30;
const radius = 10;

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#70587C',
    alignItems: 'center',
    alignContent: 'center',
    minHeight: '100%',
  },
  buttonWrap: {
    width: width,
    height: height + 40,
    margin: 8,
  },
  button: {
    borderRadius: radius,
    height: height,
    elevation: 5,
    borderBottomColor: 'black',
    borderBottomWidth: 5,
  },
  image: {
    borderRadius: radius,
    height: height,
  },
  text: {
    textAlign: 'center',
    fontFamily: 'sans-serif-thin',
    fontSize: 28,
    color: '#F9F4F5',
    // fontStyle: 'italic',
  },
});

const LauncherIcon: React.FC<LauncherIconProps> = props => {
  const linkOpenedHandler = (url: string) => {
    if (url) {
      Linking.openURL(url);
    } else {
      ToastAndroid.show('No link specified', 1000);
    }
  };

  const imageUrl = props.item.image
    ? props.item.image
    : 'http://bliz.domj.net/files/default.jpg';

  return (
    <View style={styles.buttonWrap}>
      <TouchableOpacity
        onPress={linkOpenedHandler.bind(null, props.item.url)}
        activeOpacity={0.5}
        style={styles.button}>
        <Image
          style={styles.image}
          source={{
            uri: imageUrl,
          }}
        />

        <Text style={styles.text}>{props.item.title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LauncherIcon;
