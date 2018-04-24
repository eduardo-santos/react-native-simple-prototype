import React, { Component } from 'react';
import PropTypes from 'prop-types';
import EStyleSheet from 'react-native-extended-stylesheet';
import { View, Text, Alert } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

import Container from '../components/Container/Container';
import Button from '../components/Buttons/Button';
import TextInput from '../components/TextInputs/TextInput';

import { submitLogin, changeEmail, changePassword, cleanLoginMessages } from '../actions/userLogin';
import { getUserProfile } from '../actions/userProfile';

const styles = EStyleSheet.create({
  text: {
    marginTop: 20,
    fontSize: 16,
  },
  loginSpace: {
    marginTop: 20,
  },
});

class Login extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    dispatch: PropTypes.func,
    isSubmiting: PropTypes.bool,
    submitErrorMessage: PropTypes.string,
    submitSuccessMessage: PropTypes.string,
    email: PropTypes.string,
    password: PropTypes.string,
  };

  constructor(props) {
    super(props);

    this.state = {
      validateForm: false,
    };
  }

  handleEmailInputChange = (email) => {
    this.props.dispatch(changeEmail(email));
  };

  handlePasswordInputChange = (password) => {
    this.props.dispatch(changePassword(password));
  };

  loginCallback = () => {
    if (this.props.submitErrorMessage) {
      const message = this.props.submitErrorMessage;
      this.props.dispatch(cleanLoginMessages());
      Alert.alert('Login inválido', message);
    } else if (this.props.submitSuccessMessage) {
      const message = this.props.submitSuccessMessage;
      this.props.dispatch(cleanLoginMessages());
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
        {
          cancelable: false,
        },
      );
    }
  };

  handleLogin = () => {
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
            if (this.email.state.errorMessage || this.password.state.errorMessage) {
              Alert.alert('Informações inválidas', 'Uma ou mais informações estão inválidas para o login.');
            } else {
              this.props.dispatch(submitLogin());
            }
          },
        ),
    );
  };

  handleRegister = () => {
    this.props.navigation.navigate('Cadastro');
  };

  render() {
    this.loginCallback();

    return (
      <Container>
        <TextInput
          ref={(r) => {
            this.email = r;
          }}
          handleOnChangeText={this.handleEmailInputChange}
          placeholder="E-mail"
          floatingLabel="E-mail"
          type="email"
          keyboardType="email-address"
          required
          checkSubmitValidation={this.state.validateForm}
          defaultValue={this.props.email}
          iconLeft={{ name: 'email', color: EStyleSheet.value('$primaryColor') }}
        />
        <TextInput
          ref={(r) => {
            this.password = r;
          }}
          handleOnChangeText={this.handlePasswordInputChange}
          placeholder="Senha"
          floatingLabel="Senha"
          secureTextEntry
          required
          min={6}
          max={10}
          checkSubmitValidation={this.state.validateForm}
          defaultValue={this.props.password}
          iconLeft={{ name: 'lock', color: EStyleSheet.value('$primaryColor') }}
        />
        <View style={styles.loginSpace} />
        <Button uppercase text="LOG IN" onPress={this.handleLogin} disabled={this.props.isSubmiting} />
        <Text style={styles.text}>ou</Text>
        <Button text="CADASTRE-SE" onPress={this.handleRegister} disabled={this.props.isSubmiting} />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  ...state.userLogin,
  userProfile: state.userProfile,
});

export default connect(mapStateToProps)(Login);
