import { StatusBar, Platform } from 'react-native';
import { StackNavigator } from 'react-navigation';
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';
import EStyleSheet from 'react-native-extended-stylesheet';

import Login from '../screens/Login';
import Cadastro from '../screens/Cadastro';
import UserList from '../screens/UserList';
import UserProfile from '../screens/UserProfile';
import ToDos from '../screens/ToDos';
import Posts from '../screens/Posts';
import Comments from '../screens/Comments';
import Albums from '../screens/Albums';
import Photos from '../screens/Photos';

/*
FIXME: Remover esse código e tentar ver o porque exibe o warning de 'isMounted is deprecated'.
Ao que parece é algo que o react navigator chama.
*/
console.disableYellowBox = true;

const LoginStack = StackNavigator(
  {
    Login: {
      screen: Login,
      navigationOptions: {
        headerTitle: 'Faça o Login',
      },
    },
    Cadastro: {
      screen: Cadastro,
      navigationOptions: {
        headerTitle: 'Faça o Cadastro',
      },
    },
  },
  {
    headerMode: 'screen',
    navigationOptions: EStyleSheet.create({
      headerStyle: { backgroundColor: () => EStyleSheet.value('$primaryColor') },
      headerTitleStyle: { color: () => EStyleSheet.value('$white') },
      headerTintColor: () => EStyleSheet.value('$white'),
    }),
    transitionConfig: () => ({
      screenInterpolator: sceneProps => CardStackStyleInterpolator.forHorizontal(sceneProps),
    }),
  },
);

const LoggedUserStack = StackNavigator(
  {
    UserList: {
      screen: UserList,
      navigationOptions: {
        headerTitle: 'Funcionários',
      },
    },
    UserProfile: {
      screen: UserProfile,
      navigationOptions: {
        headerTitle: 'Minha Conta',
      },
    },
    ToDos: {
      screen: ToDos,
      navigationOptions: {
        headerTitle: 'Tarefas',
      },
    },
    Posts: {
      screen: Posts,
      navigationOptions: {
        headerTitle: 'Postagens',
      },
    },
    Comments: {
      screen: Comments,
      navigationOptions: {
        headerTitle: 'Comentários',
      },
    },
    Albums: {
      screen: Albums,
      navigationOptions: {
        headerTitle: 'Álbuns',
      },
    },
    Photos: {
      screen: Photos,
      navigationOptions: {
        headerTitle: 'Fotos',
      },
    },
  },
  {
    headerMode: 'screen',
    navigationOptions: EStyleSheet.create({
      headerStyle: { backgroundColor: () => EStyleSheet.value('$primaryColor') },
      headerTitleStyle: { color: () => EStyleSheet.value('$white'), fontSize: 18 },
      headerTintColor: () => EStyleSheet.value('$white'),
    }),
    transitionConfig: () => ({
      screenInterpolator: sceneProps => CardStackStyleInterpolator.forHorizontal(sceneProps),
    }),
  },
);

export default StackNavigator(
  {
    Login: { screen: LoginStack },
    UserList: { screen: LoggedUserStack },
  },
  {
    mode: 'modal',
    // cardStyle: { paddingTop: Platform.Version > 23 ? StatusBar.currentHeight : null },
    headerMode: 'none',
  },
);
