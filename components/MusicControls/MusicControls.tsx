import React, {useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  ActivityIndicator,
} from 'react-native';

import TrackPlayer, {Track} from 'react-native-track-player';
import {listFilesRecursive} from '../../modules/file-utils';
import _ from 'lodash';

import styles from '../shared/styles';

const toTrack = (item: any): Track => {
  return {
    id: item.path, // Must be a string, required
    url: `file://${item.path}`, // Load media from the file system
    title: item.name,
    artist: 'jazz',
  };
};

const reshuffleAndPlay = async () => {
  await TrackPlayer.reset();
  listFilesRecursive().then(items => {
    // console.log(items);
    const tracks = items
      .filter(item => item.name.endsWith('.mp3'))
      .map(item => toTrack(item));

    const shuffledTracks = _.shuffle(tracks);
    // console.log(shuffledTracks);

    TrackPlayer.add(shuffledTracks).then(() => {
      console.log('tracks added');
      TrackPlayer.play().then(() => {
        console.log('playing');
      });
    });
  });
};

const MusicControls: React.FC = () => {
  const [state, setState] = useState<TrackPlayer.State>(TrackPlayer.STATE_NONE);

  const isPlaying = state === TrackPlayer.STATE_PLAYING;

  const pressedHandler = () => {
    if (isPlaying) {
      TrackPlayer.stop();
    } else {
      reshuffleAndPlay();
    }
  };

  useEffect(() => {
    TrackPlayer.getState().then(tpState => setState(tpState));
    TrackPlayer.addEventListener('playback-state', data => {
      setState(data.state);
    });
  }, []);

  const title = isPlaying ? '■ Ticho' : '► Jazz';
  const imageFile = isPlaying ? 'silence.jpg' : 'jazz.jpg';

  return (
    <View style={styles.buttonWrap}>
      <TouchableOpacity
        onPress={pressedHandler}
        activeOpacity={0.5}
        style={styles.button}>
        <View style={styles.imageWrap}>
          <Image
            style={styles.image}
            source={{
              uri: `http://bliz.domj.net/files/music/${imageFile}`,
            }}
          />
          {state !== TrackPlayer.STATE_PLAYING &&
          state !== TrackPlayer.STATE_NONE &&
          state !== TrackPlayer.STATE_READY &&
          state !== TrackPlayer.STATE_PAUSED &&
          state !== TrackPlayer.STATE_STOPPED ? (
            <ActivityIndicator
              color="#fff"
              size="large"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
              }}
            />
          ) : null}
        </View>
        <Text style={styles.text}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MusicControls;
