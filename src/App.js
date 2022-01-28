import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Container, Row } from 'react-bootstrap';
import NavBar from './components/NavBar';
import LeftHeader from './components/LeftHeader';
import Feed from './components/Feed';
import RightMenu from './components/RightMenu';
import { checkAuthentication } from './actions/auth';
import './scss/App.scss';

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuthentication());
  })

  return (
    <div className="App">
      <NavBar />
      <Container fluid>
        <Row>
          <LeftHeader />
          <Feed />
          <RightMenu />
        </Row>
      </Container>
    </div>
  )
}

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { checkAuthentication })(App);