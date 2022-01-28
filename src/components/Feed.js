import { React, useEffect } from 'react';
import Col from 'react-bootstrap/Col';
import { connect } from 'react-redux';
import { get } from '../actions/posts';
import Post from './Post';
import '../scss/Feed.scss';

function Feed(props) {

  useEffect(() => {
    props.get();
  }, []);

  return (
    <Col xs={12} md={12} lg={4} className="feed">
      {props.posts.map(post => (
        <Post
          key={post.id}
          post={post}
        />
      ))}
    </Col>
  );
}

const mapStateToProps = (state) => ({
  posts: state.post.posts
});

export default connect(mapStateToProps, { get })(Feed);