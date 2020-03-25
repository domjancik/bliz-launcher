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
} from 'react-native';

import firestore from '@react-native-firebase/firestore';

import 'reflect-metadata';
import {plainToClass} from 'class-transformer';

import LauncherItem from './model/launcher-item.model';
import LauncherIcon from './components/LauncherIcon/LauncherIcon';

BackHandler.addEventListener('hardwareBackPress', function() {
  // Ignore the back button - otherwise the app gets closed and default launcher is shown
  return true;
});

const App: React.FC = () => {
  const [items, setItems] = useState<LauncherItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('users/babickavera/items')
      .orderBy('position')
      .onSnapshot(querySnapshot => {
        const newItems = querySnapshot.docs.map(doc =>
          plainToClass(LauncherItem, {...doc.data(), id: doc.id}),
        );

        setItems(newItems);

        if (loading) {
          setLoading(false);
        }
      });

    return () => unsubscribe();
  });

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#70587C" />
      <SafeAreaView>
        <View style={styles.body}>
          <FlatList
            data={items}
            renderItem={({item}) => <LauncherIcon item={item} />}
            numColumns={3}
            keyExtractor={item => item.id}
          />
        </View>
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
});

export default App;
