import React from 'react';
import PropTypes from 'prop-types';
import { TouchableHighlight, Text } from 'react-native';
import color from 'color';

import styles from './styles';

const Button = ({ text, onPress, disabled }) => {
  const underlayColor = color(styles.$underlayColor).darken(0.1);

  const buttonStyles = [styles.container];

  if (disabled === true) {
    const disabledColor = color(styles.$buttonColor)
      .darken(0.5)
      .alpha(0.5);
    buttonStyles.push({ backgroundColor: disabledColor });
  }

  return (
    <TouchableHighlight underlayColor={underlayColor} style={buttonStyles} onPress={onPress} disabled={disabled}>
      <Text style={styles.text}>{text}</Text>
    </TouchableHighlight>
  );
};

Button.propTypes = {
  text: PropTypes.string,
  onPress: PropTypes.func,
  disabled: PropTypes.bool,
};

export default Button;
