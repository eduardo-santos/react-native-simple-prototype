import React from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';

const DefaultListItem = ({
  onPress, titleStart = null, title = null, body = null, checkStatus = null,
}) => {
  const rowStyles = [styles.row];

  if (checkStatus != null) {
    if (checkStatus.statusCompleted === true) {
      rowStyles.push({ backgroundColor: '#77D353' });
    } else {
      rowStyles.push({ backgroundColor: '#F95F62' });
    }
  }

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      {title != null ? (
        <View style={rowStyles}>
          <Text style={styles.title}>
            {titleStart}
            {title}
          </Text>
          {body != null ? <Text style={styles.body}>{body}</Text> : null}
        </View>
      ) : (
        <View />
      )}
    </TouchableWithoutFeedback>
  );
};

DefaultListItem.propTypes = {
  onPress: PropTypes.func,
  titleStart: PropTypes.string,
  title: PropTypes.string,
  body: PropTypes.string,
  checkStatus: PropTypes.object,
};

export default DefaultListItem;
