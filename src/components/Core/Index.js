import React, { Component } from 'react'

import Profile from '../Profile'
import Major from '../Major'

export default class componentName extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row justify-content-center">
          <Major />
        </div>
      </div>
    )
  }
}
