import React from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import './Post.css';

class Post extends React.Component {

  static propTypes = {
    post: PropTypes.object,
    isAuth: PropTypes.bool,
    user: PropTypes.object
  }

  render() {
    const { isAuth, user } = this.props;
    const { text, author, posted } = this.props.post;
    return (
      <div className="post">
        <div className="post-body-text">
          {this.props.post.text}
        </div>
        <hr></hr>
        <div className="post-footer">
          <div className="post-author">
            {isAuth ? `${this.props.post.author}` : 'Anonymous'}
          </div>
          <div className="post-date">
            {this.props.post.posted}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuthenticated,
  user: state.auth.user
});

export default connect(mapStateToProps)(Post);