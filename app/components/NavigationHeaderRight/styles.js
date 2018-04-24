import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  $width: 45,
  $height: 45,
  $marginRight: 5,

  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    color: '$white',
    marginRight: 10,
  },
});
