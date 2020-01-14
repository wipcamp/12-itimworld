import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const location = window.location.pathname

const Div = styled.div`
  display: ${props => props.location === '/profile' || 
              props.location === '/major' || 
              props.location === '/question' ? 'block' : 'none'};

`

const Navbar = () => {
  return (
    <Div location={location}>
      <Link to="/profile" >1</Link>
      <Link to="/general" >2</Link>
      <Link to="/major" >3</Link>
      <Link to="/questions" >4</Link>
      <Link to="/preview" >5</Link>
    </Div>
  )
}

export default Navbar
