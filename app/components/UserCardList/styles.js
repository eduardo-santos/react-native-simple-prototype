import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  row: {
    paddingHorizontal: 0,
    paddingVertical: 0,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundColor: '$white',
  },
  map: {
    width: '100%',
    height: 200,
    backgroundColor: '$mapBackgroundColor',
  },
  mapMarkerContainer: {
    alignItems: 'center',
  },
  mapMarkerTitle: {
    fontSize: 14,
    fontWeight: '500',
  },
  mapMarkerDescription: {
    fontSize: 13,
    fontWeight: '200',
  },
  mapMarkerIcon: {
    color: '$mapMarkerColor',
  },
  userInfoContainer: {
    paddingHorizontal: 20,
    marginTop: 25,
  },
  actionsContainer: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 15,
    marginBottom: 15,
    justifyContent: 'space-around',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  username: {
    fontSize: 16,
    fontWeight: 'normal',
  },
  actions: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
