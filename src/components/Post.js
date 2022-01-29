import React from 'react';
import { connect } from 'react-redux';
import nl2br from 'react-nl2br';
import Image from 'react-bootstrap/Image'
import { FaRegUserCircle } from 'react-icons/fa';
import PostOptions from './PostOptions';
import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict'

function Post(props) {
  return (
    <div className="post">
      <div className="post-header">
        {(props.isAuth && props.user.avatar) ?
          <Image className="user-avatar" alt="user-avatar" src={`http://192.168.0.10:5000/static${props.user.avatar}`} roundedCircle />
          :
          <FaRegUserCircle className="def-avatar" />}
        {props.isAuth ?
          `${props.post.author}` : 'Anonymous'}
      </div>
      <div className="post-body">
        {nl2br(props.post.text)}
        {props.post.image &&
          <Image rounded
            alt="Responsive image"
            className="post-body-image"
            src={`http://192.168.0.10:5000/static${props.post.image}`} />
        }
      </div>
      <div className="post-footer">
        <span className="post-date">
          {formatDistanceToNowStrict(new Date(props.post.posted), { addSuffix: true })}
        </span>
        <div className="post-options">
          {props.isAuth && <PostOptions className="showOnHover" post={props.post} />}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  isAuth: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Post);