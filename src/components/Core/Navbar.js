import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Steps, Popover } from 'antd';

const location = window.location.pathname

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
    current:0
  }
  componentDidMount(){
    this.updateCurrentLocation()
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

