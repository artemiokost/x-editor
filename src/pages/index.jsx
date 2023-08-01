import React from 'react'
import { Creator } from '../app'

export default function HomePage() {
  return (
    <div className='wrapper'>
      <nav className='navbar has-shadow is-fixed-top-desktop'>
        <div className='container'>
          <div className='navbar-brand'>
            <div className='navbar-item'>X</div>
          </div>
        </div>
      </nav>
      <div className='app-container'>
        <div className='content'>
          <Creator />
        </div>
      </div>
    </div>
  )
}
