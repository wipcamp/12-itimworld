import React, { Component } from 'react'
import dayjs from 'dayjs'

import Routing from '../../Router'

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
          <Routing />
          :
          'ปิดรับสมัครแล้วจ้า'
        }
      </React.Fragment>
    )
  }
}

