import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Feed from './components/Feed';
import RightMenu from './components/RightMenu';
import { checkAuthentication } from './actions/auth';
import './App.css';
import { FaGithub } from 'react-icons/fa'
import store from './store';
class App extends React.Component {

  static propTypes = {
    isAuth: PropTypes.bool,
    user: PropTypes.object,
  }

  componentDidMount() {
    store.dispatch(checkAuthentication());
  }

  render() {
    return (
      <div className="App">
        <header className="main-header">
          <div className="branding">
            <p>budget</p>twitter
          </div>
          <div className="info">
            <p>Twitter-like blog created with MERN</p>
            <p>Ayush Panwar, 2022</p>
            <p><a href="https://github.com/payyup/budget-twitter" target="_blank" rel="noreferrer"><FaGithub /> github.com/payyup</a></p>
          </div>
        </header>
        <Feed />
        <RightMenu />
      </div>
    )
  }
}



const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuthenticated,
  user: state.auth.user
});

export default connect(mapStateToProps)(App);