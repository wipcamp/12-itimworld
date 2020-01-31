import React, { Component } from 'react'
import styled from 'styled-components'

import Routing from '../../Router'

const ThisIsBackground = styled.div`
  min-height: 100vh;
  background: linear-gradient(180deg, #0F0C29 0%, rgba(2, 19, 91, 0.552083) 75%, #FFFFFF 100%);
`
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
      <ThisIsBackground>
        <Routing />
      </ThisIsBackground>
    )
  }
}

