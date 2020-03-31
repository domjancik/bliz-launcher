import React, {useEffect, useState, useRef, useCallback} from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  ActivityIndicator,
  Animated,
  Easing,
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
  const [playing, setPlaying] = useState(false);

  const rotAnim = useRef(new Animated.Value(0)).current;

  const startDance = () => {
    console.log('start anim');

    const animFront = Animated.timing(rotAnim, {
      toValue: 0.02,
      duration: 500,
      useNativeDriver: true,
    });

    const animBack = Animated.timing(rotAnim, {
      toValue: -0.02,
      duration: 500,
      easing: Easing.inOut(Easing.cubic),
      useNativeDriver: true,
    });

    const seq = Animated.sequence([animFront, animBack]);

    const loop = Animated.loop(seq);
    animBack.start(() => loop.start());
  };

  const stopDance = () => {
    console.log('stop anim');
    rotAnim.stopAnimation();
    Animated.timing(rotAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    TrackPlayer.getState().then(tpState => setState(tpState));
    TrackPlayer.addEventListener('playback-state', data => {
      setState(data.state);
    });
  }, []);

  useEffect(() => {
    if (state === TrackPlayer.STATE_PLAYING) {
      setPlaying(true);
    } else {
      setPlaying(false);
    }
  }, [state]);

  useEffect(() => {
    if (playing) {
      startDance();
    } else {
      stopDance();
    }
  }, [playing]);

  const pressedHandler = () => {
    if (playing) {
      TrackPlayer.stop();
    } else {
      reshuffleAndPlay();
    }
  };

  const title = playing ? 'Stop' : 'Jazz';
  // const imageFile = isPlaying ? 'silence.jpg' : 'jazz.jpg';
  const imageFile = 'jazz.jpg';

  const rotation = rotAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={{...styles.buttonWrap, width: 75}}>
      <TouchableOpacity
        onPress={pressedHandler}
        activeOpacity={0.5}
        style={styles.button}>
        <Animated.View
          style={{
            ...styles.imageWrap,
            transform: [{rotate: rotation}],
            //opacity: rotAnim,
          }}>
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
        </Animated.View>
        <Text style={styles.text}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MusicControls;
