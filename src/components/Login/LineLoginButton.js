import React, { Component } from 'react'
import styled from 'styled-components'

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 400px;
  height: 70px;
`
const Button = styled.button`
  height: 70px;
  width: 100%;
  max-width: 400px;
  border-radius: 20px;
  padding:0!important;
  &:active{
  border-radius: 20px;
  }
`

const LineImg = styled.img`
  height:100%;
`

const Text = styled.div`
  background: ${props => props.bgColor};
  color: #FFFFFF;
  border-radius: 20px;
  height:100%;
  font-size: 24px;
  width:100%;
  padding-right: 3rem;
  @media (max-width:768px) {
    font-size: 20px;
  }
  @media (max-width:360px) {
    font-size: 18px;
    padding-right: 1rem;
  }
`

export default class LineLoginButton extends Component {
  state = {
    bgColor: '#00C300'
  }

  mouseOver = (e) => {
    this.setState({
      bgColor: '#00E000'
    })
  }

  mouseOut = (e) => {
    this.setState({
      bgColor: '#00C300'
    })
  }

  mouseClick = () => {
    this.props.onClick()
    this.setState({
      bgColor:'#00b300'
    })
  }

  render() {
    return (
      <ButtonContainer className="mt-5" >
        <Button onClick={() => this.mouseClick()} onMouseOver={() => this.mouseOver()} onMouseOut={() => this.mouseOut()} className="btn row" >
          <Text className="d-flex align-items-center justify-content-between pl-2" bgColor={this.state.bgColor}>
            <LineImg src="/img/line_88.png"/>
            <div className="col-8">Log in with LINE</div>
          </Text>
        </Button>
      </ButtonContainer>
    )
  }
}
