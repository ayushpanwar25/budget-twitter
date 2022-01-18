import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Feed from './components/Feed';
import RightMenu from './components/RightMenu';
import { checkAuthentication } from './actions/auth';
import './App.css';
function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuthentication());
  });

  return (
    <div className="App">
      <header className="main-header">
        <div className="branding">
          budget
          twitter
        </div>
        <div className="info">
          twitter-like blog site made with MERN stack.
          by Ayush Panwar
        </div>
      </header>
      <Feed />
      <RightMenu />
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