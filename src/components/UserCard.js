import React from 'react';
import { connect } from 'react-redux';
import { FaRegUserCircle } from 'react-icons/fa';
import '../scss/UserCard.scss';

function UserCard(props) {

  return (
    <div className="user-card">
      <FaRegUserCircle className="def-avatar" />
      <div className="user-card-name" >
        {props.isAuth ?
          <p>{props.user.username}</p>
          :
          <p>Guest</p>
        }
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuthenticated,
  user: state.auth.user
});

export default connect(mapStateToProps)(UserCard);