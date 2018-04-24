import React from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/MaterialIcons';
import MapView, { Marker } from 'react-native-maps';

import styles from './styles';

const UserCardListItem = ({
  data,
  onPressMap,
  onPressToDos,
  onPressPosts,
  onPressAlbums,
  latitude,
  longitude,
  markerTitle,
  markerDescription,
}) => (
  <View style={styles.row}>
    <TouchableWithoutFeedback onPress={onPressMap}>
      <MapView
        liteMode
        style={styles.map}
        initialRegion={{
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude),
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude),
          }}
          anchor={{ x: 0.5, y: 0.6 }}
          centerOffset={{ x: 0.5, y: 0.6 }}
        >
          <View style={styles.mapMarkerContainer}>
            <Text style={styles.mapMarkerTitle}>{markerTitle}</Text>
            <Text style={styles.mapMarkerDescription}>{markerDescription}</Text>
            <Icon name="place" size={40} style={styles.mapMarkerIcon} />
          </View>
        </Marker>
      </MapView>
    </TouchableWithoutFeedback>

    <TouchableWithoutFeedback>
      <View>
        <View style={styles.userInfoContainer}>
          <Text style={styles.name}>{data.name}</Text>
          <Text style={styles.username}>{data.username}</Text>
        </View>
        <View style={styles.actionsContainer}>
          <Text onPress={onPressToDos} style={styles.username}>
            To Do
          </Text>
          <Text onPress={onPressPosts} style={styles.username}>
            Posts
          </Text>
          <Text onPress={onPressAlbums} style={styles.username}>
            Albums
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  </View>
);

UserCardListItem.propTypes = {
  data: PropTypes.object,
  onPressMap: PropTypes.func,
  onPressToDos: PropTypes.func,
  onPressPosts: PropTypes.func,
  onPressAlbums: PropTypes.func,
  latitude: PropTypes.string,
  longitude: PropTypes.string,
  markerTitle: PropTypes.string,
  markerDescription: PropTypes.string,
};

export default UserCardListItem;
