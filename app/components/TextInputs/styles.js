import EStyleSheet from 'react-native-extended-stylesheet';

const INPUT_HEIGHT = 48;

export default EStyleSheet.create({
  container: {
    height: INPUT_HEIGHT,
    width: '100%',
    marginTop: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    height: '100%',
    fontSize: 18,
    color: '$inputTextColor',
    flex: 1,
  },
  floatingLabel: {
    fontSize: 12,
    marginLeft: 4,
    color: '$floatingLabelTextColor',
  },
  errorLabel: {
    fontSize: 12,
    marginLeft: 4,
    color: 'red',
  },
});
