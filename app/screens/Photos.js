import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image, RefreshControl, TouchableWithoutFeedback, View, Text } from 'react-native';
import { connect } from 'react-redux';

import ImagePreview from 'react-native-image-preview';

import CustomGrid from '../components/Grid/CustomGrid';
import NavigationHeaderRight from '../components/NavigationHeaderRight/NavigationHeaderRight';
import * as utils from '../helpers/utils';

import { getApiPhotos, apiResetPhotos } from '../actions/api';

class Photos extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    dispatch: PropTypes.func,
    apiResultData: PropTypes.array,
    isLoading: PropTypes.bool,
  };

  static navigationOptions = ({ navigation }) => ({
    headerRight: <NavigationHeaderRight navigation={navigation} />,
  });

  constructor(props) {
    super(props);

    this.state = {
      selectedImageUrl: null,
    };
  }

  componentWillMount() {
    this.getPhotos();
  }

  componentWillUnmount() {
    this.props.dispatch(apiResetPhotos());
  }

  getPhotos = () => {
    this.props.dispatch(getApiPhotos(this.props.navigation.state.params.albumId));
  };

  getMappedData = () => this.props.apiResultData.map(data => ({ source: { uri: data.url } }));

  handleImagePress = (photo) => {
    this.setState({
      selectedImageUrl: photo.url,
    });
  };

  renderGridItem = photo => (
    <TouchableWithoutFeedback onPress={() => this.handleImagePress(photo)}>
      <Image
        style={{
          width: '100%',
          height: '100%',
        }}
        resizeMode="contain"
        source={{ uri: photo.thumbnailUrl }}
      />
    </TouchableWithoutFeedback>
  );

  render() {
    return (
      <View style={{ width: '100%', height: '100%', backgroundColor: '#FFFFFF' }}>
        <CustomGrid
          data={this.props.apiResultData}
          refreshControl={<RefreshControl refreshing={this.props.isLoading} onRefresh={() => this.getPhotos()} />}
          renderItem={this.renderGridItem}
          itemsPerRow={3}
        />
        <ImagePreview
          visible={this.state.selectedImageUrl != null}
          source={{ uri: this.state.selectedImageUrl }}
          close={() =>
            this.setState({
              selectedImageUrl: null,
            })
          }
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  ...state.api,
  apiResultData: utils.orderArrayAscendingById(state.api.apiPhotosResultData),
});

export default connect(mapStateToProps)(Photos);
