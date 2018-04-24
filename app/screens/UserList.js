import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FlatList, Platform, Linking, View } from 'react-native';
import { connect } from 'react-redux';

import SearchBar from 'react-native-searchbar';

import Container from '../components/Container/Container';
import UserCardListItem from '../components/UserCardList/UserCardListItem';
import Separator from '../components/List/Separator';
import NavigationHeaderRight from '../components/NavigationHeaderRight/NavigationHeaderRight';
import * as utils from '../helpers/utils';

import { getApiUsers } from '../actions/api';

const searchBarHeight = [{ width: '100%', paddingTop: Platform.OS === 'ios' ? 82 : 62 }];

class UserList extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    dispatch: PropTypes.func,
    apiResultData: PropTypes.array,
    isLoading: PropTypes.bool,
  };

  static navigationOptions = ({ navigation }) => ({
    headerRight: <NavigationHeaderRight navigation={navigation} />,
  });

  constructor(props) {
    super(props);

    this.state = {
      filteredResultData: [],
      searchBarTerms: '',
      showSearchBar: false,
    };
  }

  componentWillMount() {
    this.props.navigation.setParams({
      onIconPress: this.handleSearchIconPress,
    });
    this.getUsers();
  }

  componentWillReceiveProps() {
    if (this.searchBar && this.searchBar.state) {
      this.searchBar.state.input = this.state.searchBarTerms;
    }
  }

  getUsers = () => {
    this.props.dispatch(getApiUsers());
  };

  getListData = () => (this.state.searchBarTerms.length > 0 ? this.state.filteredResultData : this.props.apiResultData);

  handleUserProfilePress = () => {
    this.props.navigation.navigate('UserProfile');
  };

  handleMapPress = (item) => {
    if (item.address && item.address.geo && item.address.geo.lat && item.address.geo.lng) {
      if (Platform.OS === 'ios') {
        Linking.openURL(`http://maps.apple.com/maps?daddr=${item.address.geo.lat},${item.address.geo.lng}`);
      } else {
        Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${item.address.geo.lat},${item.address.geo.lng}`).catch(err => console.error('An error occurred', err));
      }
    }
  };

  handleToDosPress = (userId) => {
    this.props.navigation.navigate('ToDos', { userId });
  };

  handlePostsPress = (userId) => {
    this.props.navigation.navigate('Posts', { userId });
  };

  handleAlbumsPress = (userId) => {
    this.props.navigation.navigate('Albums', { userId });
  };

  handleSearchBarResults = (results) => {
    this.setState({
      searchBarTerms: this.searchBar.state.input,
    });
    this.setState({
      filteredResultData: results,
    });
  };

  handleSearchIconPress = () => {
    this.setState({
      showSearchBar: !this.state.showSearchBar,
    });
  };

  // TODO: Componentizar search bar que é utilizada em diversas telas.
  renderSearchBar = () =>
    (this.props.isLoading === false && this.state.showSearchBar === true ? (
      <View style={{ width: '100%' }}>
        <SearchBar
          ref={(ref) => {
            this.searchBar = ref;
          }}
          placeholder="Pesquisar..."
          focusOnLayout={false}
          data={this.props.apiResultData}
          handleResults={this.handleSearchBarResults}
          heightAdjust={-10}
          input={this.state.searchBarTerms}
          hideBack
        />
        <View style={searchBarHeight} />
      </View>
    ) : null);

  render() {
    return (
      <Container backgroundColor="#E1E7ED" paddingBottom={0} paddingTop={this.state.showSearchBar ? -1 : 0}>
        {this.renderSearchBar()}
        <FlatList
          refreshing={this.props.isLoading}
          onRefresh={() => this.getUsers()}
          style={{ width: '100%' }}
          data={this.getListData()}
          renderItem={({ item }) => (
            <UserCardListItem
              data={item}
              onPressMap={() => this.handleMapPress(item)}
              onPressToDos={() => this.handleToDosPress(item.id)}
              onPressPosts={() => this.handlePostsPress(item.id)}
              onPressAlbums={() => this.handleAlbumsPress(item.id)}
              latitude={item.address.geo.lat}
              longitude={item.address.geo.lng}
              markerTitle={`${item.address.street}, ${item.address.suite}`}
              markerDescription={item.address.city}
            />
          )}
          keyExtractor={item => `${item.id}`}
          ItemSeparatorComponent={Separator}
          ListHeaderComponent={Separator}
          ListFooterComponent={Separator}
        />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  ...state.api,
  apiResultData: utils.orderArrayAscendingById(state.api.apiUsersResultData),
});

export default connect(mapStateToProps)(UserList);
