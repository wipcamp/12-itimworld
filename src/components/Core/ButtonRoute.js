import React from 'react'
import styled from 'styled-components'

const ButtonRight = styled.a`
  display: ${props => props.displayButtonRight};
`
const ButtonRoute = (props) => {
  return (
    <div className="d-flex col-12 justify-content-between">
      <ButtonRight href={props.linkBack} displayButtonRight={props.displayButtonLeft}>
        <button> {props.buttonLeft} </button>
      </ButtonRight>
      <a to={props.linkNext}><button type="submit">{props.buttonRight}</button></a>
    </div>
  )
}

export default ButtonRoute
