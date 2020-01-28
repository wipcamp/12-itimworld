import React, { Component } from 'react'

import Routing from '../../Router'

export default class Index extends Component {
  componentDidUpdate() {
    // if (fakeAuth.isAuthenticated) {
    //   this.changeAuthen()
    // }
    console.log(2)
    // console.log(fakeAuth.isAuthenticated)
  }
  render() {
    return (
        <Routing />
    )
  }
}

