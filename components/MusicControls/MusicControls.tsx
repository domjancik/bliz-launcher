import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity, Image, Text} from 'react-native';

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
    console.log(items);
    const tracks = items
      .filter(item => item.name.endsWith('.mp3'))
      .map(item => toTrack(item));

    const shuffledTracks = _.shuffle(tracks);
    console.log(shuffledTracks);

    TrackPlayer.add(shuffledTracks).then(() => {
      console.log('tracks added');
      TrackPlayer.play().then(() => {
        console.log('playing');
      });
    });
  });
};

const MusicControls: React.FC = () => {
  const [playing, setPlaying] = useState(false);

  const pressedHandler = () => {
    if (playing) {
      TrackPlayer.stop();
    } else {
      reshuffleAndPlay();
    }
  };

  useEffect(() => {
    TrackPlayer.getState().then(state => {
      const playingState = state === TrackPlayer.STATE_PLAYING;
      setPlaying(playingState);
    });
  });

  const title = playing ? '■ Ticho' : '► Jazz';
  const imageFile = playing ? 'silence.jpg' : 'jazz.jpg';

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
        </View>
        <Text style={styles.text}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MusicControls;
