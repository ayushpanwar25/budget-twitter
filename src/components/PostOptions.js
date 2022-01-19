import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
//import { BsSuitHeartFill, BsSuitHeart } from "react-icons/bs";
import { deletepost } from '../actions/posts';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
//import { FaTrashAlt } from "react-icons/fa";
import './PostOptions.css';

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
          <IconButton className="IconButton" aria-label="delete" onClick={() => this.props.deletepost(this.props.post.id)}>
            <DeleteIcon className="IconButton" />
          </IconButton>
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user
});

export default connect(mapStateToProps, { deletepost })(PostOptions);