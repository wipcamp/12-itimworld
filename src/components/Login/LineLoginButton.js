import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding-top: 20px;
  max-width: 400px;
`
const Button = styled.button`
  background: #00C300;
  color: #FFFFFF;
  line-height: 1.5;
  height: 70px;
  border-radius: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  transition: all 0.4s;
  width: 100%;
  font-weight: 500;

  &:hover{
    background: #00E000;
  }

  &:active{
    background: #00B300;
  }
`

const LineImg = styled.img`
  height: 50px;
  width: 50px;
  margin-right: 10px;
`

export default class LineLoginButton extends Component {
  
  handleClick = () => {
    if(this.props.onClick){
      this.props.callbackFromRouter(true)
      this.props.onClick()
    }
  }
  render() {
    return (
      <ButtonContainer>
        <Button>
          <button className="btn" onClick={this.handleClick()} >
            {/* <Link to="/profile" onClick={() => this.handleClick()}   > */}
              <LineImg src="/img/line_88.png" /> <span>Log in with LINE</span>
            {/* </Link> */}
            </button>
        </Button>
      </ButtonContainer>
    )
  }
}
