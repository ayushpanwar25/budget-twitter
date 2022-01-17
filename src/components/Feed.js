import React from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch, useSelector } from 'react-redux';

class Feed extends React.Component {

  static propTypes = {
    user: PropTypes.object,
    posts: PropTypes.array,
    checkAuth: PropTypes.func,
  }

  render() {
    return (
      <div className="feed">
        {this.props.posts.map(post => (
          <div className="post" key={post.id} post={post}>
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  posts: state.posts,
  checkAuth: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Feed);