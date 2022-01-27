import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deletepost, like, dislike } from '../actions/posts';
import EditPost from './EditPost';
import { IconButton } from '@mui/material';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import EditIcon from '@mui/icons-material/Edit';
import '../scss/PostOptions.css';

class PostOptions extends React.Component {

  static propTypes = {
    user: PropTypes.object,
    post: PropTypes.object,
    deletepost: PropTypes.func,
    like: PropTypes.func,
    dislike: PropTypes.func
  }

  state = {
    liked: false,
    editpopup: false
  }

  render() {

    return (
      <div className="post-options">
        {this.props.user.id === this.props.post.authorID &&
          <div className="super-options">
            <IconButton aria-label="delete" onClick={() => this.props.deletepost(this.props.post.id)}>
              <DeleteOutlineOutlinedIcon className="IconButton" />
            </IconButton>
            <IconButton aria-label="edit" onClick={() => this.setState({ editpopup: true })}>
              <EditIcon className="IconButton" />
            </IconButton>
            <EditPost
              post={this.props.post}
              show={this.state.editpopup}
              onHide={() => this.setState({ editpopup: false })}
            />
          </div>
        }
        <div className="post-options-likes">
          {!this.state.liked ?
            <IconButton
              aria-label="like"
              onClick={() => {
                this.props.like(this.props.post.id);
                this.setState({ liked: true });
              }}
            >
              <FavoriteBorderOutlinedIcon className="IconButton" />
            </IconButton>
            :
            <IconButton
              aria-label="dislike"
              onClick={() => {
                this.props.dislike(this.props.post.id);
                this.setState({ liked: false });
              }}
            >
              <FavoriteOutlinedIcon className="IconButton" />
            </IconButton>
          }
          {this.props.post.hearts}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user
});

export default connect(mapStateToProps, { deletepost, like, dislike })(PostOptions);