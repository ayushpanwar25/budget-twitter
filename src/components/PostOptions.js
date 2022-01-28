import { React, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { like, dislike } from '../actions/posts';
import EditPost from './EditPost';
import Confirmation from './Confirmation';
import IconButton from '@mui/material/IconButton';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import EditIcon from '@mui/icons-material/Edit';
import '../scss/PostOptions.scss';

function PostOptions(props) {

  const [liked, setLiked] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  useEffect(() => {
    if (props.post.likes.includes(props.user.id)) {
      setLiked(true);
    }
  });

  return (
    <div className="post-options">
      {props.user.id === props.post.authorID &&
        <div className="super-options">
          <IconButton aria-label="delete" onClick={() => setShowDelete(true)}>
            <DeleteOutlineOutlinedIcon className="option-icons" />
          </IconButton>
          <Confirmation
            postid={props.post.id}
            show={showDelete}
            onHide={() => setShowDelete(false)}
          />
          <IconButton aria-label="edit" onClick={() => setShowEdit(true)}>
            <EditIcon className="option-icons" />
          </IconButton>
          <EditPost
            post={props.post}
            show={showEdit}
            onHide={() => setShowEdit(false)}
          />
        </div>
      }
      <div className="post-options-likes">
        {!liked ?
          <IconButton
            aria-label="like"
            onClick={() => {
              props.like(props.post.id);
              setLiked(true);
            }}
          >
            <FavoriteBorderOutlinedIcon className="option-icons" />
          </IconButton>
          :
          <IconButton
            aria-label="dislike"
            onClick={() => {
              props.dislike(props.post.id);
              setLiked(false);
            }}
          >
            <FavoriteOutlinedIcon style={{ fill: "#ff0095" }} />
          </IconButton>
        }
        <span className={liked && "liked"}>{props.post.numLikes}</span>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  user: state.auth.user
});

export default connect(mapStateToProps, { like, dislike })(PostOptions);