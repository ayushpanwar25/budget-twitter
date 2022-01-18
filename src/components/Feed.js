import React from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch, useSelector } from 'react-redux';
import { getAll } from '../actions/posts';
import Post from './Post';
import './Feed.css';

class Feed extends React.Component {

  static propTypes = {
    posts: PropTypes.array,
    getAll: PropTypes.func
  }

  componentDidMount() {
    this.props.getAll()
  }

  render() {
    return (
      <div className="feed">
        <div className="feed-header">
          FEED
        </div>
        {this.props.posts.map(post => (
          <Post
            key={post.id}
            post={post}
          />
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  posts: state.post.posts
});

export default connect(mapStateToProps, { getAll })(Feed);