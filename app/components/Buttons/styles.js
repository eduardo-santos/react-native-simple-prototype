import EStyleSheet from 'react-native-extended-stylesheet';

const BUTTON_HEIGHT = 48;
const BORDER_RADIUS = 4;

export default EStyleSheet.create({
  $buttonColor: '$primaryColor',
  $underlayColor: '$buttonUnderlayColor',

  container: {
    backgroundColor: '$buttonColor',
    width: '100%',
    height: BUTTON_HEIGHT,
    borderRadius: BORDER_RADIUS,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  text: {
    color: '$buttonTextColor',
    fontSize: 14,
  },
});
