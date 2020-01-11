import React from 'react'
import PropTypes from 'prop-types';
import styled from 'styled-components'  

const ButtonRight = styled.a`
  display: ${props => props.displayButtonRight};
`

const ButtonLeft = styled.a`
  display: ${props => props.displayButtonLeft};
`


const ButtonStyle = styled.button`
  width: 218.65px;
  height: 59px;

  background: #304151;
  border-radius: 4px;

  font-family: Sarabun;
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 21px;
  align-items: center;
  text-align: center;

  color: #FFFFFF;
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
      <div className="d-flex col-12 justify-content-around">
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

// const ButtonRoute = (props) => {
//   return (
//     <div className="d-flex col-12 justify-content-between">
//       <ButtonRight href={props.linkBack} displayButtonRight={props.displayButtonLeft}>
//         <button> {props.buttonLeft} </button>
//       </ButtonRight>
//       <a href={props.linkNext}><button onClick={props.onClick}>{props.buttonRight}</button></a>
//     </div>
//   )
// }

ButtonRoute.propTypes = {
  linkBack: PropTypes.string,
  displayButtonLeft: PropTypes.string,
  displayButtonRight: PropTypes.string,
  buttonLeft: PropTypes.string,
  linkNext: PropTypes.string,
  buttonRight: PropTypes.string,
  onClick: PropTypes.func
}

ButtonRoute.defaultProps = {
  displayButtonLeft: 'block',
  displayButtonRight: 'block',
  buttonLeft: 'กลับ',
  buttonRight:'ถัดไป'
}

export default ButtonRoute
