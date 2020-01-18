import React, { Component } from 'react'
import styled from 'styled-components'
import { Steps, Popover } from 'antd'

import UserService from '../../services/UserService'

const location = window.location.pathname

const userId = 120001

const Div = styled.div`
  display: ${props => props.location === '/profile' || 
              props.location === '/general' || 
              props.location === '/major' || 
              props.location === '/questions' ||
              props.location === '/preview' ? 'block' : 'none'};

`
const customDot = (dot, { status, index }) => (
  <Popover
    content={
      <span>
        step {index} status: {status}
      </span>
    }
  >
    {dot}
  </Popover>
);


export default class Navbar extends Component {
  
  state = {
    current:0,
    wipId: 0,
    name:'wip'
  }
  
  async componentDidMount(){
    this.updateCurrentLocation()
    let promise;
    try {
      promise = await this.getUserService();
      let response = promise.data;
      if (response.success) {
        let nickName = response.data[0].nickName === null || response.data[0].nickName === '' ? 'Welcome' : response.data[0].nickName
        this.setState({
          wipId: response.data[0].wipId,
          name: nickName,
        });
      } else {
        console.log("Error get User request")
      }
    } catch (e) {
      console.log("Error get User promise")
    }
  }

  componentDidUpdate(){
    console.log(this.state.wipId)
  }
  getUserService = async () => {
    return await UserService.getUser(userId);
  }

  updateCurrentLocation = () => {
    if(location === '/profile'){
      this.setState({
        current: 0
      })
    } else if (location === "/general"){
      this.setState({
        current: 1
      })
    } else if (location === "/major") {
      this.setState({
        current: 2
      })
    } else if (location === "/questions") {
      this.setState({
        current: 3
      })
    } else if (location === "/preview") {
      this.setState({
        current: 4
      })
    }
  }

  render() {
  const { Step } = Steps;
    return (
      <Div location={location} className="pt-3 mb-5">
        <div className="d-flex justify-content-between ml-5 mr-5">
            <img src="/logo192.png" alt="WIP Camp" />
            <div className="justify-content-end">
              WIP ID :{this.state.wipId}
              <br />
              {this.state.name}
            </div>
        </div>
        <Steps current={this.state.current} progressDot={customDot}>
          <Step title="Profile"  />
          <Step title="General"  />
          <Step title="Major"  />
          <Step title="Question"  />
          <Step title="Preview"  />
        </Steps>
      </Div>
    )
  }
}

   

    //   <Link to="/profile" >1</Link>
    //   <Link to="/general" >2</Link>
    //   <Link to="/major" >3</Link>
    //   <Link to="/questions" >4</Link>
    //   <Link to="/preview" >5</Link>

