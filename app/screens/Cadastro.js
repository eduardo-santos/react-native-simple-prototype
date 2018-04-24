import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView, KeyboardAvoidingView, Alert, TouchableWithoutFeedback } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

import Container from '../components/Container/Container';
import Button from '../components/Buttons/Button';
import TextInput from '../components/TextInputs/TextInput';
import RoundedImage from '../components/RoundedImage/RoundedImage';

import {
  getInitialState,
  submitRegister,
  changeBase64Image,
  changeName,
  changeEmail,
  changePassword,
  changeCpf,
  cleanRegisterMessages,
} from '../actions/userRegister';
import { getUserProfile } from '../actions/userProfile';

/*
  TODO: Fazer com que o input vá para o próximo input através do teclado do dispositivo.
*/

const styles = EStyleSheet.create({
  keyboardAvoidingView: {
    width: '100%',
    height: '100%',
  },
  scrollView: {
    width: '100%',
    backgroundColor: '$white',
  },
});

class Cadastro extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    dispatch: PropTypes.func,
    isSubmiting: PropTypes.bool,
    submitErrorMessage: PropTypes.string,
    submitSuccessMessage: PropTypes.string,
    profileImage: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
    password: PropTypes.string,
    cpf: PropTypes.string,
  };

  constructor(props) {
    super(props);

    this.state = {
      validateForm: false,
    };
  }

  componentWillMount() {
    this.props.dispatch(getInitialState());
  }

  handleImagePicker = (base64) => {
    this.props.dispatch(changeBase64Image(base64));
  };

  handleNameInputChange = (name) => {
    this.props.dispatch(changeName(name));
  };

  handleEmailInputChange = (email) => {
    this.props.dispatch(changeEmail(email));
  };

  handlePasswordInputChange = (password) => {
    this.props.dispatch(changePassword(password));
  };

  handleCpfInputChange = (cpf) => {
    this.props.dispatch(changeCpf(cpf));
  };

  registerCallback = () => {
    if (this.props.submitErrorMessage) {
      const message = this.props.submitErrorMessage;
      this.props.dispatch(cleanRegisterMessages());
      Alert.alert('Cadastro inválido', message);
    } else if (this.props.submitSuccessMessage) {
      const message = this.props.submitSuccessMessage;
      this.props.dispatch(cleanRegisterMessages());
      this.props.dispatch(getUserProfile(this.props.email));

      Alert.alert(
        'Sucesso!',
        message,
        [
          {
            text: 'OK',
            onPress: () =>
              this.props.navigation.dispatch(NavigationActions.reset({
                index: 0,
                key: null,
                actions: [NavigationActions.navigate({ routeName: 'UserList' })],
              })),
          },
        ],
        { cancelable: false },
      );

      this.props.dispatch(cleanRegisterMessages());
    }
  };

  handleRegister = () => {
    this.setState(
      {
        validateForm: true,
      },
      () =>
        this.setState(
          {
            validateForm: false,
          },
          () => {
            if (
              this.name.state.errorMessage ||
              this.email.state.errorMessage ||
              this.password.state.errorMessage ||
              this.passwordConfirm.state.errorMessage ||
              this.cpf.state.errorMessage
            ) {
              Alert.alert('Informações Inválidas', 'Uma ou mais informações estão inválidas para o cadastro.');
            } else {
              this.props.dispatch(submitRegister());
            }
          },
        ),
    );
  };

  render() {
    this.registerCallback();

    return (
      <Container>
        <ScrollView style={styles.scrollView} keyboardShouldPersistTaps="always">
          <TouchableWithoutFeedback>
            <KeyboardAvoidingView style={styles.keyboardAvoidingView} behavior="padding">
              <RoundedImage
                callbackImagePicker={this.handleImagePicker}
                source={
                  this.props.profileImage != null
                    ? { uri: this.props.profileImage }
                    : require('../components/RoundedImage/images/default-profile.png')
                }
              />
              <TextInput
                ref={(r) => {
                  this.name = r;
                }}
                placeholder="Seu Nome"
                floatingLabel="Nome"
                required
                handleOnChangeText={this.handleNameInputChange}
                checkSubmitValidation={this.state.validateForm}
                type="only-alphabet"
                defaultValue={this.props.name}
              />
              <TextInput
                ref={(r) => {
                  this.email = r;
                }}
                placeholder="Seu E-mail"
                floatingLabel="E-mail"
                keyboardType="email-address"
                type="email"
                required
                handleOnChangeText={this.handleEmailInputChange}
                checkSubmitValidation={this.state.validateForm}
                defaultValue={this.props.email}
              />
              <TextInput
                ref={(r) => {
                  this.password = r;
                }}
                placeholder="Sua Senha"
                floatingLabel="Senha"
                secureTextEntry
                required
                handleOnChangeText={this.handlePasswordInputChange}
                checkSubmitValidation={this.state.validateForm}
                defaultValue={this.props.password}
                min={6}
                max={10}
              />
              <TextInput
                ref={(r) => {
                  this.passwordConfirm = r;
                }}
                placeholder="Confirmar Senha"
                floatingLabel="Confirmar Senha"
                compareTo={{ value: this.props.password, errorMessage: 'Confirmação de senha não confere.' }}
                secureTextEntry
                required
                checkSubmitValidation={this.state.validateForm}
                min={6}
                max={10}
              />
              <TextInput
                ref={(r) => {
                  this.cpf = r;
                }}
                placeholder="Seu CPF"
                floatingLabel="CPF"
                type="cpf"
                handleOnChangeText={this.handleCpfInputChange}
                required
                checkSubmitValidation={this.state.validateForm}
                defaultValue={this.props.cpf}
              />
              <View style={{ height: 20 }} />
              <Button text="CADASTRAR" onPress={this.handleRegister} disabled={this.props.isSubmiting} />
            </KeyboardAvoidingView>
          </TouchableWithoutFeedback>
        </ScrollView>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  ...state.userRegister,
});

export default connect(mapStateToProps)(Cadastro);
