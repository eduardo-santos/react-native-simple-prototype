import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, TouchableWithoutFeedback, Image, Alert } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

import styles from './styles';

class RoundedImage extends Component {
  static propTypes = {
    source: PropTypes.any,
    onPressCallback: PropTypes.func,
    callbackImagePicker: PropTypes.func,
    alignItems: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    marginLeft: PropTypes.number,
    marginRight: PropTypes.number,
    disableOpacity: PropTypes.bool,
  };

  static defaultProps = {
    disableOpacity: false,
    callbackImagePicker: null,
    alignItems: 'flex-start',
    source: require('./images/default-profile.png'),
  };

  handleGalleryPicker = () => {
    ImagePicker.openPicker({
      width: 100,
      height: 100,
      cropping: true,
      includeBase64: true,
    }).then((image) => {
      const base64 = `data:${image.mime};base64,${image.data}`;

      this.props.callbackImagePicker(base64);
    });
  };

  handleCameraPicker = () => {
    ImagePicker.openCamera({
      width: 100,
      height: 100,
      cropping: true,
      includeBase64: true,
    }).then((image) => {
      const base64 = `data:${image.mime};base64,${image.data}`;

      this.props.callbackImagePicker(base64);
    });
  };

  handleImagePicker = () => {
    Alert.alert(
      'Imagem de Perfil',
      'Selecione uma imagem para usar no seu perfil:',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Galeria', onPress: () => this.handleGalleryPicker() },
        { text: 'Câmera', onPress: () => this.handleCameraPicker() },
      ],
      { cancelable: true },
    );
  };

  handleOnPress = () => {
    if (this.props.callbackImagePicker != null) {
      this.handleImagePicker();
    } else if (this.props.onPressCallback != null) {
      this.props.onPressCallback();
    }
  };

  render() {
    const stylesTouchableOpacity = [styles.touchableOpacity];
    const stylesImage = [styles.image];

    if (this.props.alignItems) {
      stylesTouchableOpacity.push({ alignItems: this.props.alignItems });
    }

    if (this.props.width) {
      stylesImage.push({ width: this.props.width });
    }

    if (this.props.height) {
      stylesImage.push({ height: this.props.height });
    }

    if (this.props.marginLeft) {
      stylesImage.push({ marginLeft: this.props.marginLeft });
    }

    if (this.props.marginRight) {
      stylesImage.push({ marginRight: this.props.marginRight });
    }

    if (this.props.disableOpacity === true) {
      return (
        <TouchableWithoutFeedback onPress={this.handleOnPress} style={stylesTouchableOpacity}>
          <Image resizeMode="contain" style={stylesImage} source={this.props.source} />
        </TouchableWithoutFeedback>
      );
    }
    return (
      <TouchableOpacity onPress={this.handleOnPress} style={stylesTouchableOpacity}>
        <Image resizeMode="contain" style={stylesImage} source={this.props.source} />
      </TouchableOpacity>
    );
  }
}

export default RoundedImage;
