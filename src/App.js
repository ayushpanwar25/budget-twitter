import React from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import NavBar from './components/NavBar';
import LeftHeader from './components/LeftHeader';
import Feed from './components/Feed';
import RightMenu from './components/RightMenu';
import { checkAuthentication } from './actions/auth';
import './scss/App.scss';
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
      <Container fluid>
        <Row>
          <Col xs={12} md={12} lg={0}>
            <NavBar />
          </Col>
        </Row>
        <Row>
          <Col xs={0} md={0} lg={4}>
            <LeftHeader />
          </Col>
          <Col xs={12} md={12} lg={4}>
            <Feed />
          </Col>
          <Col xs={0} md={0} lg={4}>
            <RightMenu />
          </Col>
        </Row>
      </Container>
    )
  }
}

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuthenticated,
  user: state.auth.user
});

export default connect(mapStateToProps)(App);