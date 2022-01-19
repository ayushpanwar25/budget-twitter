import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FaRegUserCircle } from 'react-icons/fa';
import './UserCard.css';

class UserCard extends React.Component {

  static propTypes = {
    isAuth: PropTypes.bool,
    user: PropTypes.object,
  }

  render() {
    return (
      <div className="user-card">
        <div className="user-avatar"><FaRegUserCircle /></div>
        <div className="user-card-info">
          <p>Logged in as:</p>
          <div className="user-card-name">
            {this.props.isAuth ?
              <p>{this.props.user.username}</p>
              :
              <p>Guest</p>
            }
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuthenticated,
  user: state.auth.user
});

export default connect(mapStateToProps)(UserCard);