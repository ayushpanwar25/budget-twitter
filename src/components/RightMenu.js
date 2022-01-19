import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logout } from "../actions/auth";
import SignUp from './SignUp';
import Login from './Login';
import UserCard from './UserCard';
import CreatePost from './CreatePost';
import './RightMenu.css'

class RightMenu extends React.Component {

  static propTypes = {
    isAuth: PropTypes.bool,
    signupSuccess: PropTypes.bool,
    user: PropTypes.object,
    logout: PropTypes.func
  }

  constructor(props) {
    super(props);
    this.state = {
      SignUpClass: 'hidden',
      LogInClass: 'hidden',
      CreatePostClass: 'hidden'
    };
  }

  expandSignUp = () => {
    this.state.SignUpClass === 'hidden' ? this.setState({ SignUpClass: 'visible' }) : this.setState({ SignUpClass: 'hidden' });
  }

  expandLogIn = () => {
    this.state.LogInClass === 'hidden' ? this.setState({ LogInClass: 'visible' }) : this.setState({ LogInClass: 'hidden' });
  }

  expandCreatePost = () => {
    this.state.CreatePostClass === 'hidden' ? this.setState({ CreatePostClass: 'visible' }) : this.setState({ CreatePostClass: 'hidden' });
  }

  render() {
    return (
      <div className="right-menu">
        {!this.props.isAuth ?
          <div className="menu-buttons">
            <button className="menu-btn" onClick={this.expandSignUp}>SIGN UP</button>
            <div className={`pop-up ${this.state.SignUpClass}`}>
              <SignUp />
              {this.props.signupSuccess ? <p>Sign up successful!</p> : null}
            </div>
            <button className="menu-btn" onClick={this.expandLogIn}>EXISTING USER? LOG IN</button>
            <div className={`pop-up ${this.state.LogInClass}`}>
              <Login />
            </div>
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
  user: state.auth.user
});

export default connect(mapStateToProps, { logout })(RightMenu);