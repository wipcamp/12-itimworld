import React from 'react'
import PropTypes from 'prop-types';
import styled from 'styled-components'

const ButtonRight = styled.a`
  display: ${props => props.displayButtonRight};
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
      <div className="d-flex col-12 justify-content-between">
        <ButtonRight href={this.props.linkBack} displayButtonRight={this.props.displayButtonLeft}>
          <button> {this.props.buttonLeft} </button>
        </ButtonRight>
        <button onClick={()=>this.handleGoToNextPage()}>{this.props.buttonRight}</button>
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
  buttonLeft: PropTypes.string,
  linkNext: PropTypes.string,
  buttonRight: PropTypes.string,
  onClick: PropTypes.func
}

ButtonRoute.defaultProps = {
  displayButtonLeft: 'block',
  buttonLeft: 'กลับ',
  buttonRight:'ถัดไป'
}

export default ButtonRoute
