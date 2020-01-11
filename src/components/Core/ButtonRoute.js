import React from 'react'
import PropTypes from 'prop-types';
import styled from 'styled-components' 

import { ButtonStyle } from './ButtonStyle'

const ButtonRight = styled.a`
  display: ${props => props.displayButtonRight};
`

const ButtonLeft = styled.a`
  display: ${props => props.displayButtonLeft};
`

class ButtonRoute extends React.Component{

  async handleGoToNextPage(){
    if(this.props.onClick){
      await this.props.onClick()
      window.location.href = this.props.linkNext;
    }
    window.location.href = this.props.linkNext

  }

  render(){
    return (
      <div className={`${this.props.className} ${this.props.displayButtonLeft === "none" || this.props.displayButtonRight === "none"? "" : "justify-content-between"}`}>
        <ButtonLeft 
          href={this.props.linkBack} 
          displayButtonLeft={this.props.displayButtonLeft} 
        >
          <ButtonStyle> {this.props.buttonLeft} </ButtonStyle>
        </ButtonLeft>
        <ButtonRight 
          displayButtonRight={this.props.displayButtonRight}
        >
          <ButtonStyle onClick={()=>this.handleGoToNextPage()}>{this.props.buttonRight}</ButtonStyle>
        </ButtonRight>
      </div>
    )
  }
}

ButtonRoute.propTypes = {
  linkBack: PropTypes.string,
  displayButtonLeft: PropTypes.string,
  displayButtonRight: PropTypes.string,
  buttonLeft: PropTypes.string,
  linkNext: PropTypes.string,
  buttonRight: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string
}

ButtonRoute.defaultProps = {
  displayButtonLeft: 'block',
  displayButtonRight: 'block',
  buttonLeft: 'กลับ',
  buttonRight:'ถัดไป',
  className: 'd-flex col-12'
}

export default ButtonRoute
