import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FlatList, View, Platform } from 'react-native';
import { connect } from 'react-redux';

import SearchBar from 'react-native-searchbar';

import Container from '../components/Container/Container';
import DefaultListItem from '../components/List/DefaultListItem';
import Separator from '../components/List/Separator';
import NavigationHeaderRight from '../components/NavigationHeaderRight/NavigationHeaderRight';
import * as utils from '../helpers/utils';

import { getApiPosts, apiResetPosts } from '../actions/api';

const searchBarHeight = [{ width: '100%', paddingTop: Platform.OS === 'ios' ? 82 : 62 }];

class Posts extends Component {
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
    this.getPosts();
  }

  componentWillReceiveProps() {
    if (this.searchBar && this.searchBar.state) {
      this.searchBar.state.input = this.state.searchBarTerms;
    }
  }

  componentWillUnmount() {
    this.props.dispatch(apiResetPosts());
  }

  getPosts = () => {
    this.props.dispatch(getApiPosts(this.props.navigation.state.params.userId));
  };

  getListData = () => (this.state.searchBarTerms.length > 0 ? this.state.filteredResultData : this.props.apiResultData);

  handlePostPress(postId) {
    this.props.navigation.navigate('Comments', {
      postId,
    });
  }

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
      <Container paddingBottom={0}>
        {this.renderSearchBar()}
        <FlatList
          refreshing={this.props.isLoading}
          onRefresh={() => this.getPosts()}
          style={{ width: '100%' }}
          data={this.getListData()}
          renderItem={({ item }) => (
            <DefaultListItem onPress={() => this.handlePostPress(item.id)} title={item.title} body={item.body} />
          )}
          keyExtractor={item => `${item.id}`}
          ItemSeparatorComponent={Separator}
          ListFooterComponent={Separator}
        />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  ...state.api,
  apiResultData: utils.orderArrayDescendingById(state.api.apiPostsResultData),
});

export default connect(mapStateToProps)(Posts);
