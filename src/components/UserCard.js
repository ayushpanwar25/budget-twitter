import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import { FaRegUserCircle } from 'react-icons/fa';
//import '../scss/UserCard.css';

function UserCard({ isAuth, user }) {

  return (
    <Card style={{ width: '18rem' }}>
      {/*<Card.Img variant="top" src="holder.js/100px180" />*/}
      <div className="user-avatar"><FaRegUserCircle /></div>
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          {/*<div className="user-card">
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
      </div>*/}
          {this.props.isAuth ?
            <p>{this.props.user.username}</p>
            :
            <p>Guest</p>
          }
        </Card.Text>
      </Card.Body>
    </Card>

  )
}



const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuthenticated,
  user: state.auth.user
});

export default connect(mapStateToProps)(UserCard);