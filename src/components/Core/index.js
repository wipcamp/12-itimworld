import React, { Component } from 'react'
import dayjs from 'dayjs'
import { Beforeunload } from 'react-beforeunload';
import Cookies from 'universal-cookie'

import Routing from '../../Router'

const cookies = new Cookies()

const dateNow = dayjs().format('YYYY-MM-DDTHH:mm')
// const dateNow = dayjs('2020-03-14T00:00')
const dateEnd = dayjs('2020-03-13T00:00')

export default class Index extends Component {

  render() {
    return (
      <React.Fragment>
        {
          dateEnd.isAfter(dateNow)
          ?
            <Beforeunload onBeforeunload={() => cookies.remove('token', { path: '/' }) } >
              <Routing />
            </Beforeunload>
            :
            'ปิดรับสมัครแล้วจ้า'
          }
      </React.Fragment>
    )
  }
}

