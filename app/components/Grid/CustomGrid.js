import React from 'react';
import PropTypes from 'prop-types';
import { View, Dimensions } from 'react-native';

import Grid from 'react-native-grid-component';

import styles from './styles';

const CustomGrid = ({
  renderItem, data, itemsPerRow = 3, itemHeight = 0, itemMargin = 1, refreshControl,
}) => {
  let gridItemHeight = itemHeight;

  if (itemHeight === 0) {
    gridItemHeight = (Dimensions.get('window').width + itemMargin) / itemsPerRow;
  }

  const itemStyles = [styles.item];

  itemStyles.push({ height: gridItemHeight });
  itemStyles.push({ margin: itemMargin });

  return (
    <Grid
      style={styles.grid}
      refreshControl={refreshControl}
      data={data}
      renderItem={dataItem => (
        <View style={itemStyles} key={dataItem.id}>
          {renderItem(dataItem)}
        </View>
      )}
      itemsPerRow={itemsPerRow}
    />
  );
};

CustomGrid.propTypes = {
  renderItem: PropTypes.any,
  data: PropTypes.array,
  itemsPerRow: PropTypes.number,
  itemHeight: PropTypes.number,
  itemMargin: PropTypes.number,
  refreshControl: PropTypes.object,
};

export default CustomGrid;
