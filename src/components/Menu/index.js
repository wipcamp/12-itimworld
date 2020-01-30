import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Index extends Component {

  state = {
    menu: [
      { link : '/profile' , message: 'profile'},
      { link : '/general' , message: 'general'},
      { link : '/major' , message: 'major'},
      { link : '/document' , message: 'document'}
    ]
  }

  render() {
    return (
      <React.Fragment>
        {
          this.state.menu.map((data, i) => (
            <Link to={data.link} className="ml-5">
              {data.message}
            </Link>
          ))
        }
      </React.Fragment>
    )
  }
}
