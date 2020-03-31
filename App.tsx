/**
 * Bliz Launcher
 * https://github.com/dominikjancik/bliz-launcher
 *
 * @format
 */

import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  StatusBar,
  FlatList,
  BackHandler,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import 'reflect-metadata';
import {plainToClass} from 'class-transformer';

import LauncherItem from './model/launcher-item.model';
import LauncherIcon from './components/LauncherIcon/LauncherIcon';
import actions from './modules/actions';
import MusicControls from './components/MusicControls/MusicControls';
import TrackPlayer from 'react-native-track-player';

import credentials from './modules/credentials';

BackHandler.addEventListener('hardwareBackPress', function() {
  // Ignore the back button - otherwise the app gets closed and default launcher is shown
  return true;
});

const App: React.FC = () => {
  const [items, setItems] = useState<LauncherItem[]>([]);
  const [loading, setLoading] = useState(true);

  const loadItems = () => {
    return firestore()
      .collection('users/babickavera/items')
      .orderBy('position')
      .onSnapshot(querySnapshot => {
        const newItems = querySnapshot.docs.map(doc =>
          plainToClass(LauncherItem, {...doc.data(), id: doc.id}),
        );

        newItems.push(new LauncherItem('Jazz', 'music', '', '', ''));
        setItems(newItems);
      });
  };

  useEffect(() => {
    let unsubscribe: () => void;
    auth()
      .signInWithEmailAndPassword(credentials.username, credentials.password)
      .then(_ => {
        unsubscribe = loadItems();
        setLoading(false);
      })
      .catch(reason => {
        console.log(`Login failed: ${reason}`);
        console.log('Loading from cache');

        unsubscribe = loadItems();
        setLoading(false);
      });

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  const iconOpenedHandler = (action: string, arg: string) => {
    console.log(action, arg);
    if (actions.hasOwnProperty(action)) {
      TrackPlayer.stop();
      actions[action](arg);
    } else {
      ToastAndroid.show('Unknown action: ' + action, 1000);
    }
  };

  const content = loading ? (
    <ActivityIndicator
      size="large"
      color="#fff"
      style={styles.activityIndicator}
    />
  ) : (
    <FlatList
      data={items}
      renderItem={({item}) => getListItem(item)}
      numColumns={3}
      keyExtractor={item => item.id}
    />
  );

  const getListItem = (item: LauncherItem) => {
    if (item.action === 'music') {
      return <MusicControls />;
    } else {
      return <LauncherIcon onClick={iconOpenedHandler} item={item} />;
    }
  };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#70587C" />
      <SafeAreaView>
        <View style={styles.body}>{content}</View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#70587C',
    alignItems: 'center',
    alignContent: 'center',
    minHeight: '100%',
  },
  activityIndicator: {
    height: '100%',
  },
});

export default App;
