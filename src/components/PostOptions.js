import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { BsSuitHeartFill, BsSuitHeart } from "react-icons/bs";
import { FaTrashAlt } from "react-icons/fa";
import './Post.css';

class PostOptions extends React.Component {

  static propTypes = {
    isAuth: PropTypes.bool,
    user: PropTypes.object,
    authorID: PropTypes.string
  }

  render() {

    if (!this.props.isAuth) return (
      <div className="post-options">
      </div>
    );

    return (
      <div className="post-options">
        {this.props.user.id === this.props.authorID &&
          <button className="delete-post"><FaTrashAlt />
          </button>
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuthenticated,
  user: state.auth.user
});

export default connect(mapStateToProps)(PostOptions);