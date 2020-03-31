import React from 'react';
import {View, TouchableOpacity, Image, Text} from 'react-native';
import LauncherItem from '../../model/launcher-item.model';

import styles from '../shared/styles';

export interface LauncherIconProps {
  item: LauncherItem;
  onClick: (action: string, arg: string) => void;
}

const LauncherIcon: React.FC<LauncherIconProps> = props => {
  const imageUrl = props.item.image ? props.item.image : undefined;

  return (
    <View style={styles.buttonWrap}>
      <TouchableOpacity
        onPress={props.onClick.bind(null, props.item.action, props.item.arg)}
        activeOpacity={0.5}
        style={styles.button}>
        <View style={styles.imageWrap}>
          <Image
            style={styles.image}
            source={{
              uri: imageUrl,
            }}
          />
        </View>
        <Text
          onPress={props.onClick.bind(null, props.item.action, props.item.arg)}
          style={styles.text}>
          {props.item.title}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LauncherIcon;
