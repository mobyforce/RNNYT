import React, { PropTypes, Component } from 'react';
import {
  ListView,
  StyleSheet,
  View
} from 'react-native';
import * as globalStyles from '../styles/global';

export default class NewsFeed extends Component {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1.title !== row2.title
    });
    this.state = {
      dataSource: this.ds.cloneWithRows(props.news),
      modalVisible: false
    };

    this.renderRow = this.renderRow.bind(this);
    this.onModalOpen = this.onModelOpen.bind(this);
  }

  renderModal() {
    return (
      <Modal
        visible = {this.state.modalVisible}
      >
      </Modal>
    );
  }

  onModalOpen() {
    this.setState({
      modalVisible: true
    });
  }

  renderRow(rowData, ...rest) {
    const index = parseInt(rest[1], 10);
    return (
      <NewsItem
        onPress = {() = this.onModalOpen()}
        style={styles.newsItem}
        index={index}
        {...rowData}
      />
    );
  }

  render() {
    return (
      <View style={globalStyles.COMMON_STYLES.pageContainer}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          style={this.props.listStyles}
        />
        {this.renderModal()}
      </View>
    );
  }

}

NewsFeed.propTypes = {
  news: PropTypes.arrayOf(PropTypes.object),
  listStyles: View.propTypes.style
};

NewsFeed.defaultProps = {
  news: [
    {
      title: 'React Native',
      imageUrl: 'https://facebook.github.io/react/img/logo_og.png',
      description: 'Build Native Mobile Apps using JavaScript and React',
      date: new Date(),
      author: 'Facebook',
      location: 'Menlo Park, California',
      url: 'https://facebook.github.io/react-native'
    },
    {
      title: 'Packt Publishing',
      imageUrl: 'https://www.packtpub.com/sites/default/files/packt_logo.png',
      description: 'Stay Relevant',
      date: new Date(),
      author: 'Packt Publishing',
      location: 'Birmingham, UK',
      url: 'https://www.packtpub.com/'
    }
  ]
};

const styles = StyleSheet.create({
  newsItem: {
    marginBottom: 20
  }
});
