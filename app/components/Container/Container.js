import PropTypes from 'prop-types';
import React from 'react';
import { View, TouchableWithoutFeedback, Keyboard } from 'react-native';

import styles from './styles';

const Container = ({
  children,
  backgroundColor,
  paddingHorizontal = -1,
  paddingVertical = -1,
  paddingTop = -1,
  paddingBottom = -1,
}) => {
  const containerStyles = [styles.container];

  if (backgroundColor) {
    containerStyles.push({ backgroundColor });
  }

  if (paddingHorizontal >= 0) {
    containerStyles.push({ paddingHorizontal });
  }

  if (paddingVertical >= 0) {
    containerStyles.push({ paddingVertical });
  }

  if (paddingTop >= 0) {
    containerStyles.push({ paddingTop });
  }

  if (paddingBottom >= 0) {
    containerStyles.push({ paddingBottom });
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={containerStyles}>{children}</View>
    </TouchableWithoutFeedback>
  );
};

Container.propTypes = {
  children: PropTypes.any,
  backgroundColor: PropTypes.string,
  paddingHorizontal: PropTypes.number,
  paddingVertical: PropTypes.number,
  paddingTop: PropTypes.number,
  paddingBottom: PropTypes.number,
};

export default Container;
