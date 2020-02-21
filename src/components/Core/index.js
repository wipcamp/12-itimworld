import React, { Component } from 'react'
import styled from 'styled-components'
import dayjs from 'dayjs'
import Cookies from 'universal-cookie';

import Routing from '../../Router'
import Navbar from './Navbar'

const dateNow = dayjs().format('YYYY-MM-DDTHH:mm')
// const dateNow = dayjs('2020-03-14T00:00')
const dateEnd = dayjs('2020-21-1T00:00')

const locationNow = window.location.pathname
const cookies = new Cookies()

const ThisIsBackground = styled.div`
  min-height: 100vh;
  height:100%;
  background: linear-gradient(180deg, #0F0C29 0%, rgba(2, 19, 91, 0.5521) 99.99%, rgba(255, 255, 255, 0.03) 100%);
  z-index:-2;
`
export default class Index extends Component {

  componentDidMount(){
    // window.location.href = 'https://wip.camp/'
  }

  render() {
    return (
      <React.Fragment>
        {
          dateEnd.isAfter(dateNow)
          ?
            <ThisIsBackground>
              {
                (cookies.get('token') !== undefined && cookies.get('token') !== null) && locationNow !== '/login' ?
                  // true  && locationNow !== '/login' ?
                  <Navbar /> :
                  ''
              }
              <Routing />
            </ThisIsBackground>
          :
          'ปิดรับสมัครแล้วจ้า'
        }
      </React.Fragment>
    )
  }
}

