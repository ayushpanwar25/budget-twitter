import React from 'react';
import { connect } from 'react-redux';
import nl2br from 'react-nl2br';
import PropTypes from 'prop-types';
import Image from 'react-bootstrap/Image'
import PostOptions from './PostOptions';
import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict'
import '../scss/Post.scss';

class Post extends React.Component {

  static propTypes = {
    post: PropTypes.object,
    isAuth: PropTypes.bool
  }

  render() {
    const { isAuth } = this.props;
    return (
      <div className="post">
        <div className="post-body-text">
          {nl2br(this.props.post.text)}
        </div>
        <Image rounded="true" className="post-body-image" src='http://localhost:5000/static/images/ss.png' />
        <div className="post-footer">
          <div className="post-info">
            {isAuth ? `${this.props.post.author}` : 'Anonymous'}&nbsp;
            <span className="post-date">
              {formatDistanceToNowStrict(new Date(this.props.post.posted), { addSuffix: true })}
            </span>
          </div>
          <div className="post-options">
            {isAuth && <PostOptions className="showOnHover" post={this.props.post} />}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Post);