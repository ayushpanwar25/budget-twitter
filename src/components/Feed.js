import React from 'react';
import { Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { get } from '../actions/posts';
import Post from './Post';
import '../scss/Feed.css';

class Feed extends React.Component {

  static propTypes = {
    posts: PropTypes.array,
    get: PropTypes.func
  }

  componentDidMount() {
    this.props.get()
  }

  render() {
    return (
      <Col xs={12} md={12} lg={4} className="feed">
        {this.props.posts.map(post => (
          <Post
            key={post.id}
            post={post}
          />
        ))}
      </Col>
    );
  }
}

const mapStateToProps = (state) => ({
  posts: state.post.posts
});

export default connect(mapStateToProps, { get })(Feed);