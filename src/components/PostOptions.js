import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deletepost } from '../actions/posts';
import { IconButton } from '@mui/material';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
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
          <IconButton aria-label="delete" onClick={() => this.props.deletepost(this.props.post.id)}>
            <DeleteOutlineOutlinedIcon className="IconButton" />
          </IconButton>
        }
        <div className="post-options-likes">
          <IconButton aria-label="like">
            <FavoriteBorderOutlinedIcon className="IconButton" />
          </IconButton>
          {this.props.post.hearts}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user
});

export default connect(mapStateToProps, { deletepost })(PostOptions);