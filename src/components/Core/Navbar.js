import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const location = window.location.pathname

const Div = styled.div`
  display: ${props => props.location === '/' ? 'none' : 'block'};

`

const Navbar = () => {
  return (
    <Div location={location}>
      <Link to="/profile" >1</Link>
      <Link to="/major" >2</Link>
      <Link to="/questions" >3</Link>
    </Div>
  )
}

export default Navbar
