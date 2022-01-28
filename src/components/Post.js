import React from 'react';
import { connect } from 'react-redux';
import nl2br from 'react-nl2br';
import Image from 'react-bootstrap/Image'
import PostOptions from './PostOptions';
import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict'

function Post(props) {

  return (
    <div className="post">
      <div className="post-header">
        <div className="post-info">
          {props.isAuth ? `${props.post.author}` : 'Anonymous'}&nbsp;
          <span className="post-date">
            {formatDistanceToNowStrict(new Date(props.post.posted), { addSuffix: true })}
          </span>
        </div>
        <div className="post-options">
          {props.isAuth && <PostOptions className="showOnHover" post={props.post} />}
        </div>
      </div>
      <div className="post-body">
        {nl2br(props.post.text)}
        {props.post.image &&
          <Image
            alt="Responsive image"
            rounded="true"
            className="post-body-image"
            src={`http://192.168.0.10:5000/static${props.post.image}`} />
        }
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Post);