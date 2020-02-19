import React from 'react'
import PropTypes from 'prop-types';
import styled from 'styled-components' 
import { Link } from 'react-router-dom'
import { ButtonStyle } from './ButtonStyle'

const ButtonRight = styled(Link)`
  display: ${props => props.displayButtonRight};
`

const ButtonLeft = styled(Link)`
  display: ${props => props.displayButtonLeft};
`

const ButtonBack = styled(ButtonStyle)`

  @media (max-width: 768px) {
    
    background: #FFFFFF!important;

    /* blue */
    border: 1px solid #304151!important;
    box-sizing: border-box!important;
    border-radius: 4px!important;

    color: #000!important;

    width: 150.65px!important;
    height: 49px!important;
    border-radius: 4px!important;
    font-weight: 300!important;
    font-size: 16px!important;
    line-height: 21px!important;
  }

  @media (max-width: 576px) {
    width: 88.8px!important;
    height: 33.76px!important;
    border-radius: 4px!important;
    font-weight: 300!important;
    font-size: 16px!important;
    line-height: 10px!important;
  }
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
          <ButtonBack> {this.props.buttonLeft} </ButtonBack>
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
