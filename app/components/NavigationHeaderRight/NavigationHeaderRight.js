import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { connect } from 'react-redux';

import Icon from 'react-native-vector-icons/MaterialIcons';
import RoundedImage from '../RoundedImage/RoundedImage';

import styles from './styles';

const NavigationHeaderRight = ({ navigation, profileImage }) => (
  <View style={styles.container}>
    {navigation.state.params && navigation.state.params.onIconPress ? (
      <Icon name="search" size={30} style={styles.icon} onPress={() => navigation.state.params.onIconPress()} />
    ) : null}
    {profileImage ? (
      <RoundedImage
        onPressCallback={() => navigation.navigate('UserProfile')}
        source={{ uri: profileImage }}
        width={styles.$width}
        height={styles.$height}
        marginRight={styles.$marginRight}
        disableOpacity
      />
    ) : (
      <RoundedImage
        onPressCallback={() => navigation.navigate('UserProfile')}
        width={styles.$width}
        height={styles.$height}
        marginRight={styles.$marginRight}
        disableOpacity
      />
    )}
  </View>
);
NavigationHeaderRight.propTypes = {
  navigation: PropTypes.object,
  profileImage: PropTypes.string,
};

const mapStateToProps = state => ({
  profileImage: state.userProfile.profileImage,
});

export default connect(mapStateToProps)(NavigationHeaderRight);
