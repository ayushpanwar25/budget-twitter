import React from 'react';
import Col from 'react-bootstrap/Col';
import MenuButtons from './MenuButtons';
import UserCard from './UserCard';
import '../scss/RightMenu.scss';

export default function RightMenu() {
  return (
    <Col xs={0} md={0} lg={4} className="right-menu">
      <MenuButtons />
      <UserCard />
    </Col>
  )
}