import React, { Component } from 'react'

import ImageRadio from './ImageRadio'
import ButtonRoute from '../Core/ButtonRoute'

export default class Index extends Component {

  state = {
    imgPath: [
      'https://icatcare.org/app/uploads/2018/07/Thinking-of-getting-a-cat.png',
      'https://miro.medium.com/max/11400/1*lS9ZqdEGZrRiTcL1JUgt9w.jpeg',
      'https://icatcare.org/app/uploads/2018/07/Thinking-of-getting-a-cat.png',
      'https://miro.medium.com/max/11400/1*lS9ZqdEGZrRiTcL1JUgt9w.jpeg'
    ],
    description: [
      'Commodo voluptate in adipisicing commodo irure ex incididunt.',
      'Commodo cupidatat quis enim minim excepteur eiusmod ipsum est.',
      'Anim reprehenderit occaecat cupidatat pariatur fugiat eiusmod cupidatat fugiat in ut.',
      'Esse adipisicing amet irure dolor ullamco nisi eu magna cupidatat.'
    ],
    descriptionNum: 0
  }

  changeDescription = (i) => {
    console.log(i)
    this.setState({
      descriptionNum: i
    })
  }

  render() {
    return (
      <React.Fragment>
        <div className="row justify-content-center">
            {
              this.state.imgPath.map((data, key) => (
                <ImageRadio className="col-3" key={key} imgPath={data} onClick={() => this.changeDescription(key)} />
              )
              )
            }
          <p className="d-flex col-12 justify-content-center">
            {this.state.description[this.state.descriptionNum]}
          </p>
        </div>
        <ButtonRoute 
          linkBack ="/profile"
          linkNext ="/questions"
          />
      </React.Fragment>
    )
  }
}
