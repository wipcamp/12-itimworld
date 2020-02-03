import React, { Component } from 'react'
import styled from 'styled-components'
import dayjs from 'dayjs'

import Routing from '../../Router'

const dateNow = dayjs().format('YYYY-MM-DDTHH:mm')
// const dateNow = dayjs('2020-03-14T00:00')
const dateEnd = dayjs('2020-03-13T00:00')

const ThisIsBackground = styled.div`
  min-height: 100vh;
  height:100%;
  background: linear-gradient(180deg, #0F0C29 0%, rgba(2, 19, 91, 0.552083) 75%, #FFFFFF 100%);
  z-index:-2;
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
      <React.Fragment>
        {
          dateEnd.isAfter(dateNow)
          ?
            <ThisIsBackground>
              <Routing />
            </ThisIsBackground>
          :
          'ปิดรับสมัครแล้วจ้า'
        }
      </React.Fragment>
    )
  }
}

