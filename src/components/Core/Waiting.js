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
  return <div className="">
      <Sky>
        <Skypic src='img/Loading/l_bge.png' />
        <Wippo src='/img/Loading/l_maine.png' />
      </Sky>
    </div>;
}

const Sky = styled.div`
  /* background-image:url('/img/Loading/l_bge.png'); */
  background-repeat: no-repeat;
  background-position: center center;
  background-size: auto;
`

const Wippo = styled.img`
  position: absolute;
  margin: auto;
  top: 0;
  left: 0;
  right: 0;
  bottom: 10vh;
  width: 20%;
  @media (max-width: 992px) {
    width:30%;
  }

  @media (max-width: 768px) {
    width:40%;
  }

  @media (max-width: 576px) {
    width:80%;
  }
`

const Skypic = styled(Wippo)`
  animation: rotate 15s linear infinite;

  @keyframes rotate {
    from{
        transform: rotate(0deg);
    }
    to{
        transform: rotate(360deg);
    }
  }
`

const display = (error) => {
  if(error)
    return <Error />;
  else
    return <Loading />;
}

const Landing = (props) => {
  return (
    <div class="container">
      <div className="row text-center">
        {display(props.error)}
      </div>
    </div>
    )
  };

export default Landing;