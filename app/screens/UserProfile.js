import React, { Component } from 'react';
import PropTypes from 'prop-types';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Alert, View, Text } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

import Container from '../components/Container/Container';
import Button from '../components/Buttons/Button';
import RoundedImage from '../components/RoundedImage/RoundedImage';

import { cleanLogin } from '../actions/userLogin';
import { changeUserProfileImage, userProfileLogout, cleanUserProfileMessages } from '../actions/userProfile';

const styles = EStyleSheet.create({
  name: {
    marginTop: 20,
    marginBottom: 5,
    fontSize: 20,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 14,
    fontWeight: 'normal',
  },
  textRemove: {
    fontSize: 14,
    fontWeight: 'normal',
    textDecorationLine: 'underline',
  },
  buttonMarginTop: {
    marginTop: 70,
  },
  imageMarginTop: {
    marginTop: 20,
  },
});

class UserProfile extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    dispatch: PropTypes.func,
    profileImage: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
    cpf: PropTypes.string,
    successMessage: PropTypes.string,
    errorMessage: PropTypes.string,
  };

  handleProfileImageChange = (base64Image) => {
    this.props.dispatch(changeUserProfileImage(base64Image));
  };

  handleProfileImageRemove = () => {
    Alert.alert(
      'Limpar imagem',
      'Deseja remover sua atual imagem de perfil?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'OK',
          onPress: () => {
            this.handleProfileImageChange(null);
          },
        },
      ],
      { cancelable: true },
    );
  };

  profileImageChangeCallback = () => {
    if (this.props.errorMessage) {
      const message = this.props.errorMessage;
      this.props.dispatch(cleanUserProfileMessages());
      Alert.alert('Falha', message);
    } else if (this.props.successMessage) {
      this.props.dispatch(cleanUserProfileMessages());
    }
  };

  handleLogout = () => {
    Alert.alert(
      'Logout',
      'Deseja confirmar o logout do seu usuário?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'OK',
          onPress: () => {
            this.props.dispatch(userProfileLogout());
            this.props.dispatch(cleanLogin());
            this.props.navigation.dispatch(NavigationActions.reset({
              index: 0,
              key: null,
              actions: [NavigationActions.navigate({ routeName: 'Login' })],
            }));
          },
        },
      ],
      { cancelable: true },
    );
  };

  render() {
    this.profileImageChangeCallback();
    return (
      <Container>
        <View style={styles.imageMarginTop} />
        <RoundedImage
          callbackImagePicker={this.handleProfileImageChange}
          alignItems="center"
          width={100}
          height={100}
          source={
            this.props.profileImage != null
              ? { uri: this.props.profileImage }
              : require('../components/RoundedImage/images/default-profile.png')
          }
        />
        {this.props.profileImage != null ? (
          <Text style={styles.textRemove} onPress={() => this.handleProfileImageRemove()}>
            Limpar Imagem
          </Text>
        ) : null}
        <Text style={styles.name}>{this.props.name}</Text>
        <Text style={styles.text}>{this.props.email ? this.props.email.toLowerCase() : this.props.email}</Text>
        <Text style={styles.text}>{this.props.cpf}</Text>
        <View style={styles.buttonMarginTop} />
        <Button text="SAIR" onPress={this.handleLogout} />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  ...state.userProfile,
});

export default connect(mapStateToProps)(UserProfile);
