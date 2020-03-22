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

const App = () => {
  let items = [...Array(10).keys()];
  //items = loadData();
  function handleButton(_) {
    console.log('hello from here');
    Linking.openURL('skype:pan_anonym');
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <View style={styles.body}>
          <FlatList
            data={items}
            renderItem={({item}) => (
              <View style={styles.buttonWrap}>
                <TouchableOpacity onPress={handleButton} activeOpacity={0.5}>
                  <Image
                    style={styles.button}
                    source={{
                      uri:
                        'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Face_of_SpooSpa.jpg/450px-Face_of_SpooSpa.jpg',
                    }}
                  />

                  <Text>{item}</Text>
                </TouchableOpacity>
              </View>
            )}
            numColumns={3}
            keyExtractor={(item, _) => item}
          />
        </View>
      </SafeAreaView>
    </>
  );
  /*return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Header />
          {global.HermesInternal == null ? null : (
            <View style={styles.engine}>
              <Text style={styles.footer}>Engine: Hermes</Text>
            </View>
          )}
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Step One</Text>
              <Text style={styles.sectionDescription}>
                Edit <Text style={styles.highlight}>App.tsx</Text> to change
                this screen and then come back to see your edits. asdasd
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>See Your Changes</Text>
              <Text style={styles.sectionDescription}>
                <ReloadInstructions />
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Debug</Text>
              <Text style={styles.sectionDescription}>
                <DebugInstructions />
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Learn More</Text>
              <Text style={styles.sectionDescription}>
                Read the docs to discover what to do next:
              </Text>
            </View>
            <LearnMoreLinks />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );*/
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.black,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  buttonWrap: {
    width: 130,
    height: 170,
    padding: 5,
  },
  button: {
    padding: 10,
    backgroundColor: 'red',
    borderRadius: 20,
    height: 100,
  },
});

export default App;
