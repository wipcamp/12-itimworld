import React from 'react';
import ReactLoading from 'react-loading';
import styled from 'styled-components'

const MiddleScreen = styled.div`
  margin-top:30vh;
`

const Error = () => {
  return <p style={{"color":"#FFFFFF"}}>Error</p>
}

const Loading = () => {
  return <ReactLoading type="spinningBubbles" color="#FFFFFF" />;
}

const display = (error) => {
  if(error)
    return <Error />;
  else
    return <Loading />;
}

const Landing = (props) => {
  return (
    <div class="container">
      <MiddleScreen className="row justify-content-center">
        {display(props.error)}
      </MiddleScreen>
    </div>
    )
  };

export default Landing;