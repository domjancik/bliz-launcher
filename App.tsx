/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  FlatList,
  TouchableOpacity,
  Linking,
  Image,
  ImageBackground,
  BackHandler,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import firestore from '@react-native-firebase/firestore';
import 'reflect-metadata';
import {plainToClass} from 'class-transformer';

declare var global: {HermesInternal: null | {}};

class LauncherItem {
  constructor(public title: string, public url: string) {}
}

async function loadData() {
  // Read the users documents
  const querySnapshot = await firestore()
    .collection('devices')
    .get();

  // console.log('Total users', querySnapshot.size);
  // console.log('User Documents', querySnapshot.docs);

  querySnapshot.docs.forEach(item => console.log(item.data()));

  return querySnapshot.docs.map(doc => plainToClass(LauncherItem, doc));
}

BackHandler.addEventListener('hardwareBackPress', function() {
  // this.onMainScreen and this.goBack are just examples, you need to use your own implementation here
  // Typically you would use the navigator here to go to the last state.

  return true;
});

const App = () => {
  //let items = [...Array(10).keys()];
  let items = ['Honza', 'Kokos', 'Honza', 'Kokos', 'Honza', 'Kokos'];
  //items = loadData();
  function handleButton(_) {
    Linking.openURL('skype:pan_anonym?call&amp;video=true');
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#70587C" />
      <SafeAreaView>
        <View style={styles.body}>
          <FlatList
            data={items}
            renderItem={({item}) => (
              <View style={styles.buttonWrap}>
                <TouchableOpacity
                  onPress={handleButton}
                  activeOpacity={0.5}
                  style={styles.button}>
                  <Image
                    style={styles.image}
                    source={{
                      uri:
                        // 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Face_of_SpooSpa.jpg/450px-Face_of_SpooSpa.jpg',
                        'http://bliz.domj.net/files/image2.jpg',
                      // 'https://get.pxhere.com/photo/face-facial-hair-fine-looking-guy-man-model-person-portrait-serious-wear-1563283.jpg',
                    }}
                  />

                  <Text style={styles.text}>{item}</Text>
                </TouchableOpacity>
              </View>
            )}
            numColumns={3}
            keyExtractor={(_, index) => index}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

const width = 115;
const height = width;
const radius = 100;

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#70587C',
    alignItems: 'center',
    alignContent: 'center',
    minHeight: '100%',
  },
  buttonWrap: {
    width: width,
    height: height + 35,
    margin: 8,
  },
  button: {
    // padding: 10,
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
    // fontWeight: '700',
    fontFamily: 'sans-serif-thin',
    fontSize: 22,
    color: '#F9F4F5',
    // fontStyle: 'italic',
  },
});

export default App;
