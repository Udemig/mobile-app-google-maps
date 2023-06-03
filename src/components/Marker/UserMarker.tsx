import {View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {LatLng, Marker} from 'react-native-maps';
import styles from './styles';

interface IUserMarkerProps {
  coordinates: LatLng;
  userImageURL: string;
  onPress: () => void;
}

export default function UserMarker({
  coordinates,
  userImageURL,
  onPress,
}: IUserMarkerProps) {
  return (
    <Marker coordinate={coordinates}>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.container}>
          <Image source={{uri: userImageURL}} style={styles.image} />
        </View>
      </TouchableOpacity>
    </Marker>
  );
}
