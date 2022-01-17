import React, { useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
//import Feed from './components/Feed';
//import RightBar from './components/RightBar';
import SignUp from './components/SignUp';
import logo from './logo.svg';
import './App.css';
function App() {

  /*useEffect(() => {
    // Check if session cookie is present
    const isAuth = this.props.isAuth();

  });*/

  return (
    <div className="App">
      <header className="main-header">
        <div className="branding">
          budget twitter
        </div>
        <div className="header-buttons">

        </div>
      </header>
      <div className="feed">
        Coming Soon!
      </div>
      <div className="right-menu">
        <SignUp />
      </div>
    </div>
  )
}

App.propTypes = {
  isAuth: PropTypes.bool,
  user: PropTypes.object,
}

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuthenticated,
  user: state.auth.user
});

export default connect(mapStateToProps)(App);