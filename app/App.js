import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Provider } from 'react-redux';

import Navigator from './config/routes';

import store from './config/store';

EStyleSheet.build({
  $primaryColor: '#00006c',
  $white: '#FFFFFF',

  $buttonTextColor: '$white',
  $buttonUnderlayColor: '$primaryColor',
  $inputTextColor: '#000000',
  $floatingLabelTextColor: '#BDC4CF',
  $floatingLabelTextSelectedColor: '#7aadf9',
  $underlineColor: '#E1E7ED',
  $mapBackgroundColor: '#AADAFF',
  $mapMarkerColor: '#d90000',

  $outline: 0,
});

export default () => (
  <Provider store={store}>
    <Navigator onNavigationStateChange={null} />
  </Provider>
);
