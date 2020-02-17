import React from 'react'
import PropTypes from 'prop-types';
import styled from 'styled-components' 
import { Link } from 'react-router-dom'
import { ButtonStyle, ButtonStyleLink } from './ButtonStyle'

const ButtonRight = styled(Link)`
  display: ${props => props.displayButtonRight};
`

const ButtonLeft = styled(Link)`
  display: ${props => props.displayButtonLeft};
`

class ButtonRoute extends React.Component{

  async handleGoToNextPage (){
    if(this.props.onClick){
      await this.props.onClick()
    }
  }

  render(){
    return (
      <div className={`${this.props.className} 
                ${this.props.displayButtonLeft === "none" || this.props.displayButtonRight === "none" ? "" 
                : "justify-content-between"}`}>
        <ButtonLeft 
          to={this.props.linkBack} 
          displayButtonLeft={this.props.displayButtonLeft} 
        >
          <ButtonStyle> {this.props.buttonLeft} </ButtonStyle>
        </ButtonLeft >
        
        <ButtonRight 
          to={this.props.linkNext}
          displayButtonRight={this.props.displayButtonRight}
          onClick={()=>this.handleGoToNextPage()}
        >
            <ButtonStyle disabled={this.props.buttonRightDisabled}> {this.props.buttonRight}</ButtonStyle>
        </ButtonRight>
      </div>
    )
  }
}

ButtonRoute.propTypes = {
  onClick: PropTypes.func,
  linkNext: PropTypes.string,
  className: PropTypes.string,
  displayButtonLeft: PropTypes.string,
  displayButtonRight: PropTypes.string,
  buttonLeft: PropTypes.string,
  linkBack: PropTypes.string,
  buttonRight: PropTypes.string,
  buttonRightDisabled: PropTypes.bool
}

ButtonRoute.defaultProps = {
  displayButtonLeft: 'block',
  displayButtonRight: 'block',
  buttonLeft: 'กลับ',
  buttonRight:'ถัดไป',
  className: 'd-flex col-12',
  buttonRightDisabled: false
}

export default ButtonRoute
