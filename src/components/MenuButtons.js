import React, { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import { connect } from 'react-redux';
import { logout } from "../actions/auth";
import Button from 'react-bootstrap/Button';
import SignUp from './SignUp';
import Login from './Login';
import CreatePost from './CreatePost';

function MenuButtons(props) {

  const [showSignin, setShowSignin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showCreate, setShowCreate] = useState(false);

  return (
    <div>
      {!props.isAuth ?
        <Nav className="flex-column">
          <Button variant="primary" onClick={() => setShowSignup(true)}>
            SIGN UP
          </Button>
          <SignUp
            show={showSignup}
            onHide={() => setShowSignup(false)}
          />
          <Button variant="primary" onClick={() => setShowSignin(true)}>
            EXISTING USER? SIGN IN
          </Button>
          <Login
            show={showSignin}
            onHide={() => setShowSignin(false)}
          />
        </Nav>
        :
        <Nav className="flex-column">
          <Button variant="primary" onClick={() => setShowCreate(true)}>
            CREATE POST
          </Button>
          <CreatePost
            show={showCreate}
            onHide={() => setShowCreate(false)}
          />
          <Button variant="primary" onClick={props.logout}>
            SIGN OUT
          </Button>
        </Nav>

      }
    </div>
  )
}

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuthenticated,
  user: state.auth.user,
  loginResponse: state.auth.loginResponse,
  signupResponse: state.auth.signupSuccess
});

export default connect(mapStateToProps, { logout })(MenuButtons);