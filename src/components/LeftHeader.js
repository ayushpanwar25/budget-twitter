import React from 'react';
import { FaGithub } from 'react-icons/fa'

export default function LeftHeader() {
  return (
    <div>
      <div className="branding">
        <p>budget</p>twitter
      </div>
      <div className="info">
        <p>Twitter-like blog created with MERN</p>
        <p>Ayush Panwar, 2022</p>
        <p><a href="https://github.com/payyup/budget-twitter" target="_blank" rel="noreferrer"><FaGithub className="github-logo" /> github.com/payyup</a></p>
      </div>
    </div>
  )
}