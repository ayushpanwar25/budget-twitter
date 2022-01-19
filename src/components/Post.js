import React from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import PostOptions from './PostOptions';
import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict'
import './Post.css';

class Post extends React.Component {

  static propTypes = {
    post: PropTypes.object,
    isAuth: PropTypes.bool
  }

  render() {
    const { isAuth } = this.props;
    //const posted = formatDistanceToNow(new Date(this.props.post.posted), { addSuffix: true });
    //console.log(this.props.post);
    return (
      <div className="post">
        <PostOptions authorID={this.props.post.authorID} />
        <div className="post-body-text">
          {this.props.post.text}
        </div>
        <hr></hr>
        <div className="post-footer">
          <div className="post-author">
            {isAuth ? `${this.props.post.author}` : 'Anonymous'}
          </div>
          <div className="post-date">
            {formatDistanceToNowStrict(new Date(this.props.post.posted), { addSuffix: true })}
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