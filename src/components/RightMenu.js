import React from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch, useSelector } from 'react-redux';
import { logout } from "../actions/auth";
import SignUp from './SignUp';
import Login from './Login';
import './RightMenu.css'

class RightMenu extends React.Component {

  static propTypes = {
    isAuth: PropTypes.bool,
    user: PropTypes.object,
    logout: PropTypes.func
  }

  constructor(props) {
    super(props);
    this.state = {
      SignUpClass: 'hidden',
      LogInClass: 'hidden'
    };
  }

  expandSignUp = () => {
    this.state.SignUpClass === 'hidden' ? this.setState({ SignUpClass: 'visible' }) : this.setState({ SignUpClass: 'hidden' });
  }

  expandLogIn = () => {
    this.state.LogInClass === 'hidden' ? this.setState({ LogInClass: 'visible' }) : this.setState({ LogInClass: 'hidden' });
  }

  render() {
    return (
      <div className="right-menu">
        {!this.props.isAuth ?
          <div className="menu-buttons">
            <button className="menu-btn" onClick={this.expandSignUp}>SIGN UP</button>
            <div className={`sign-up-form ${this.state.SignUpClass}`}>
              <SignUp />
            </div>
            <button className="menu-btn" onClick={this.expandLogIn}>EXISTING USER? LOG IN</button>
            <div className={`sign-up-form ${this.state.LogInClass}`}>
              <Login />
            </div>
          </div>
          :
          <div className="menu-buttons">
            <button className="menu-btn">CREATE POST</button>
            <button className="menu-btn">MY POSTS</button>
            <button className="menu-btn" onClick={this.props.logout}>LOGOUT</button>
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuthenticated,
  user: state.auth.user
});

export default connect(mapStateToProps, { logout })(RightMenu);