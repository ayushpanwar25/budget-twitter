import { React, useState } from 'react';
import Image from 'react-bootstrap/Image'
import { connect } from 'react-redux';
import { FaRegUserCircle } from 'react-icons/fa';
import AddAvatar from './AddAvatar';
import '../scss/UserCard.scss';

function UserCard(props) {

  const [showAvatar, setShowAvatar] = useState(false);

  return (
    <div className="user-card">
      {props.isAuth ?
        (props.user.avatar ?
          <Image className="user-avatar" alt="user-avatar" src={`http://192.168.0.10:5000/static${props.user.avatar}`} onClick={() => setShowAvatar(true)} roundedCircle />
          :
          <FaRegUserCircle className="def-avatar" onClick={() => setShowAvatar(true)} />)
        :
        <FaRegUserCircle className="def-avatar" />
      }
      <AddAvatar
        show={showAvatar}
        onHide={() => setShowAvatar(false)} />
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