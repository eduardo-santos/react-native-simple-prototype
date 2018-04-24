import React, { Component } from 'react';
import { View, TextInput, Text } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import PropTypes from 'prop-types';
import { TextInputMask } from 'react-native-masked-text';

import Icon from 'react-native-vector-icons/MaterialIcons';

import styles from './styles';

const textInputMaskTypes = [
  'credit-card',
  'cpf',
  'cnpj',
  'zip-code',
  'only-numbers',
  'money',
  'cel-phone',
  'datetime',
  'custom',
];

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const onlyAlphabetRegex = /[^a-zA-ZÀ-ÿ ]/g;

class DefaultTextInput extends Component {
  static propTypes = {
    handleOnChangeText: PropTypes.func,
    editable: PropTypes.bool,
    floatingLabel: PropTypes.string,
    type: PropTypes.string,
    required: PropTypes.bool,
    max: PropTypes.number,
    min: PropTypes.number,
    validateOnChange: PropTypes.bool,
    checkSubmitValidation: PropTypes.bool,
    defaultValue: PropTypes.string,
    compareTo: PropTypes.object,
    iconLeft: PropTypes.object,
    iconRight: PropTypes.object,
  };

  static defaultProps = {
    validateOnChange: true,
  };

  constructor(props) {
    super(props);

    this.state = {
      inputValue: props.defaultValue,
      floatingLabel: null,
      errorMessage: null,
    };
  }

  getFloatingLabel = (event) => {
    const floatingLabelStyles = [styles.floatingLabel];
    let showFloatingLabel = !!this.props.floatingLabel;

    if (showFloatingLabel) {
      if (event === 'onFocus') {
        floatingLabelStyles.push({ color: EStyleSheet.value('$floatingLabelTextSelectedColor') });
      } else if (event === 'onBlur') {
        floatingLabelStyles.push({ color: EStyleSheet.value('$floatingLabelTextColor') });

        if (this.state.inputValue == null || this.state.inputValue.length <= 0) {
          showFloatingLabel = false;
        }
      }
    }

    return showFloatingLabel ? <Text style={floatingLabelStyles}>{this.props.floatingLabel}</Text> : null;
  };

  updateFloatingLabel = (event) => {
    this.setState({
      floatingLabel: this.getFloatingLabel(event),
    });
  };

  handleOnFocus = () => {
    this.updateFloatingLabel('onFocus');
  };

  handleOnEndEditing = () => {
    this.updateFloatingLabel('onBlur');
  };

  validateInput = () => {
    let error = null;

    if (this.state.inputValue) {
      if (this.props.type) {
        switch (this.props.type) {
          case 'cpf':
            error = !this.ref.isValid() ? 'CPF inválido.' : null;
            break;
          case 'email':
            error = emailRegex.test(this.state.inputValue) === false ? 'E-mail inválido.' : null;
            break;
          default:
            error = null;
        }
      }

      if (this.props.compareTo) {
        const compareToError = this.props.compareTo.errorMessage
          ? this.props.compareTo.errorMessage
          : 'Comparação inválida.';
        error = this.state.inputValue !== this.props.compareTo.value ? compareToError : error;
      }

      if (this.props.max) {
        error = this.state.inputValue.length > this.props.max ? `O máximo de caracteres é ${this.props.max}.` : error;
      }

      if (this.props.min) {
        error = this.state.inputValue.length < this.props.min ? `O mínimo de caracteres é ${this.props.min}.` : error;
      }
    }

    if (this.props.required) {
      error = this.state.inputValue == null || this.state.inputValue.length <= 0 ? 'Campo obrigatório.' : error;
    }

    // FIXME: Corrigir warning ocasionado por chamar a função validateInput() no render
    this.setState({
      errorMessage: error,
    });
  };

  handleOnChangeText = (text) => {
    const value = this.props.type === 'only-alphabet' ? text.replace(onlyAlphabetRegex, '') : text;

    this.setState(
      {
        inputValue: value,
      },
      () => {
        if (this.props.validateOnChange === true) {
          this.validateInput();
        }
        if (this.props.handleOnChangeText) {
          this.props.handleOnChangeText(value, this.state.errorMessage == null);
        }
      },
    );
  };

  renderIcon = (direction) => {
    if (direction === 'left') {
      return (
        <Icon
          name={this.props.iconLeft.name}
          size={this.props.iconLeft.size ? this.props.iconLeft.size : 22}
          color={this.props.iconLeft.color ? this.props.iconLeft.color : null}
          style={{ paddingRight: this.props.iconLeft.paddingRight ? this.props.iconLeft.paddingRight : 8 }}
        />
      );
    } else if (direction === 'right') {
      return (
        <Icon
          name={this.props.iconRight.name}
          size={this.props.iconRight.size ? this.props.iconRight.size : 22}
          color={this.props.iconRight.color ? this.props.iconRight.color : null}
          style={{ paddingLeft: this.props.iconRight.paddingLeft ? this.props.iconRight.paddingLeft : 8 }}
        />
      );
    }

    return null;
  };

  render() {
    const containerStyles = [styles.container];

    if (this.state.errorMessage) {
      containerStyles.push({ marginBottom: 12 });
    }

    let textInput = (
      <TextInput
        style={styles.input}
        underlineColorAndroid={EStyleSheet.value('$underlineColor')}
        onFocus={this.handleOnFocus}
        onEndEditing={this.handleOnEndEditing}
        value={this.state.inputValue}
        onChangeText={text => this.handleOnChangeText(text)}
        checkSubmitValidation={this.props.checkSubmitValidation ? this.validateInput() : null}
        {...this.props}
      />
    );

    if (this.props.type && textInputMaskTypes.indexOf(this.props.type) > 0) {
      textInput = (
        <TextInputMask
          ref={(r) => {
            this.ref = r;
          }}
          style={styles.input}
          underlineColorAndroid={EStyleSheet.value('$underlineColor')}
          onFocus={this.handleOnFocus}
          onEndEditing={this.handleOnEndEditing}
          value={this.state.inputValue}
          onChangeText={text => this.handleOnChangeText(text)}
          checkSubmitValidation={this.props.checkSubmitValidation ? this.validateInput() : null}
          {...this.props}
        />
      );
    }

    return (
      <View style={containerStyles}>
        {this.state.floatingLabel}
        <View style={styles.inputContainer}>
          {this.props.iconLeft ? this.renderIcon('left') : null}
          {textInput}
          {this.props.iconRight ? this.renderIcon('right') : null}
        </View>
        {this.state.errorMessage ? <Text style={styles.errorLabel}>{this.state.errorMessage}</Text> : null}
      </View>
    );
  }
}

export default DefaultTextInput;
