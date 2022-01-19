import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { BsSuitHeartFill, BsSuitHeart } from "react-icons/bs";
import { deletepost } from '../actions/posts';
import { FaTrashAlt } from "react-icons/fa";
import './Post.css';

class PostOptions extends React.Component {

  static propTypes = {
    user: PropTypes.object,
    post: PropTypes.object,
    deletepost: PropTypes.func
  }

  render() {

    return (
      <div className="post-options">
        {this.props.user.id === this.props.post.authorID &&
          <button className="delete-post" onClick={() => this.props.deletepost(this.props.post.id)}><FaTrashAlt />
          </button>
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user
});

export default connect(mapStateToProps, { deletepost })(PostOptions);