import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logout } from "../actions/auth";
import Button from 'react-bootstrap/Button';
import SignUp from './SignUp';
import Login from './Login';
import UserCard from './UserCard';
import CreatePost from './CreatePost';
import '../scss/RightMenu.css';

class RightMenu extends React.Component {

  static propTypes = {
    isAuth: PropTypes.bool,
    signupSuccess: PropTypes.bool,
    user: PropTypes.object,
    logout: PropTypes.func,
    loginResponse: PropTypes.string
  }

  constructor(props) {
    super(props);
    this.state = {
      SignUpModal: false,
      LogInModal: false,
      CreatePostModal: false
    };
  }

  render() {
    return (
      <div className="right-menu">
        {!this.props.isAuth ?
          <div className="menu-buttons">
            <Button variant="primary" onClick={() => this.setState({ SignUpModal: true })}>
              SIGN UP
            </Button>
            <SignUp
              show={this.state.SignUpModal}
              onHide={() => this.setState({ SignUpModal: false })}
            />
            <Button variant="primary" onClick={() => this.setState({ LogInModal: true })}>
              LOG IN
            </Button>
            <Login
              show={this.state.LogInModal}
              onHide={() => this.setState({ LogInModal: false })}
            />
            {/*<button className="menu-btn" onClick={this.expandSignUp}>SIGN UP</button>
            <div className={`pop-up ${this.state.SignUpClass}`}>
              <SignUp />
              {this.props.signupSuccess ? <p>Sign up successful!</p> : null}
        </div>
            <button className="menu-btn" onClick={this.expandLogIn}>EXISTING USER? LOG IN</button>
            <div className={`pop-up ${this.state.LogInClass}`}>
              <Login />
              {this.props.loginResponse ? <p className='error-message'>{this.props.loginResponse}</p> : null}
            </div>*/}
          </div>
          :
          <div className="menu-buttons">
            <button className="menu-btn" onClick={this.expandCreatePost}>CREATE POST</button>
            <div className={`pop-up ${this.state.CreatePostClass}`}>
              <CreatePost />
            </div>
            <button className="menu-btn">MY POSTS</button>
            <button className="menu-btn" onClick={this.props.logout}>LOGOUT</button>
          </div>
        }
        <UserCard />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  signupSuccess: state.auth.signupSuccess,
  isAuth: state.auth.isAuthenticated,
  user: state.auth.user,
  loginResponse: state.auth.loginResponse
});

export default connect(mapStateToProps, { logout })(RightMenu);