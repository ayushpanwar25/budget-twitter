import React from 'react';
import Col from 'react-bootstrap/Col';
import { FaGithub } from 'react-icons/fa';
import '../scss/LeftHeader.scss';

export default function LeftHeader() {
  return (
    <Col xs={0} md={0} lg={4} className="left-header">
      <div className="branding">
        <p>budget</p>twitter
      </div>
      <div className="info">
        <p>Twitter-like blog created with MERN</p>
        <p>Ayush Panwar, 2022</p>
        <p><a href="https://github.com/payyup/budget-twitter" target="_blank" rel="noreferrer"><FaGithub className="github-logo" /> github.com/payyup</a></p>
      </div>
    </Col>
  )
}