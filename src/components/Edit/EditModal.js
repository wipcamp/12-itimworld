import React, { Component , useState } from 'react'

import UserService from '../../services/UserService'

import ConfirmModal from './ConfirmModal';

const userId = 120001;

export default class EditModal extends Component {
  
  state = {
    newUser: [],
    data:{}
  }
  componentDidUpdate(prevProps){
    // console.log(this.state.backdrop)
    if(this.props.newUser !== prevProps.newUser){
      const dataEntries = Object.entries(this.props.newUser)
      this.setState(state => ({
        newUser: dataEntries,
        data: this.props.data
      }))
    }
  }
    
  putUser = async (data) => {
    const nonRequireKey = [
      "allergicFood",
      "congenitalDisease",
      "congenitalDrug"
    ];
    Object.keys(data).map((keyData) => {
      if (!nonRequireKey.includes(keyData, 0)) {
        if (data[keyData] == null) {
          alert(keyData + " cannot be empty")
        }
      }
    })

    let data1 = await UserService.putUser(userId, data)
    console.log(data1)
  }

  render() {

    return (
      <React.Fragment>
        <ConfirmModal disabled={this.props.disabled} newUser={this.state.newUser} onClick={() => this.putUser(this.state.data)}/>
      </React.Fragment>
    )
  }
}
