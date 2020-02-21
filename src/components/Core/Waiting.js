import React from 'react';
import styled from 'styled-components'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { ButtonStyle , ButtonStyleLink } from './ButtonStyle'

const Section = styled.div`
  min-height:70vh;
`

const DSection = styled.div`
  min-height: 30vh;
`

const BackgroundBlack = styled.div`
  min-height: 100vh;
  background: rgba(0, 0, 0, 0.4); 
`

const ButtonBack = styled(ButtonStyle)`
  background-color: #304151!important;
  @media (max-width: 576px){
    width:150.65px!important; 
  }
`

const Sky = styled.div`
  /* background-image:url('/img/Loading/l_bge.png'); */
  background-repeat: no-repeat;
  background-position: center center;
  background-size: auto;
`

const Mountain = styled.div`
  background-image:url('/img/mountain.png') , url('/img/Star/zodiac1.png'), url('/img/Star/zodiac2.png'), url('/img/Star/zodiac3.png') , url('/img/Star/star1.png'), url('/img/Star/star2.png'), url('/img/Star/star3.png');
  background-repeat: no-repeat;
  background-position: center bottom , 5% 20% , 15% 2% , 90% 10% , 10% 6% ,  87% 0% , 100% 13%;
  background-size:contain , 5% , 8% , 5% , 14% , 25% , 15% ;
  min-height: 100vh;
  width: 100%;
  padding-bottom: 30px;
  transform: scaleX(-1);
  position:absolute;
`

const ThisIsBackground = styled.div`
  min-height: 100vh;
  height:100%;
  background: linear-gradient(180deg, #0F0C29 0%, rgba(2, 19, 91, 0.5521) 99.99%, rgba(255, 255, 255, 0.03) 100%);
`

const Wippo = styled.img`
  position: absolute;
  margin: auto;
  top: 0;
  left: 0;
  right: 0;
  bottom: 10vh;
  width: 21%;
  @media (max-width: 992px) {
    width:31%;
  }

  @media (max-width: 768px) {
    width:41%;
  }

  @media (max-width: 576px) {
    width:81%;
  }
`

const WippoAnimation = styled(Wippo)`
  animation: change 7.5s alternate infinite;
  @keyframes change {
    0% {
    opacity:0;
    }
    20% {
    opacity:0.2;
    }
    40% {
    opacity:0.4;
    }
    60% {
    opacity:0.6;
    }
    80% {
    opacity:0.8;
    }
    100% {
    opacity:1;
    }
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


export const Loading = () => {
  return (
    <div>
      <BackgroundBlack>
        <Section>
          <div className="container">
            <div className="row text-center">
              <div className="">
              <Sky>
                <Skypic src='img/Loading/l_bge.png' />
                <Wippo src='/img/Loading/l_maine.png' />
                <WippoAnimation src='img/Loading/l_greye.png'/>
              </Sky>
              </div>
            </div>
          </div>
        </Section>
        <DSection>
          <h4 className="text-white mt-3 text-center">Loading...</h4>
        </DSection>
      </BackgroundBlack>
    </div>
  );
}


export const Error = () => {
  return (
    <div>
    {/* <Mountain>
    </Mountain> */}
      <Section>
        <div className="container pt-5">
          <div className="row">
            <div className="col-12 col-md-6 col-lg-6">
              <h1 className="text-white mt-3">มีบางอย่างผิดพลาด  </h1>
              <h4 className="text-white mt-4">ขอโทษครับ ไม่สามารถเรียกข้อมูลที่ต้องการได้ ลองใหม่อีกครั้งนะครับ</h4>
              <div className="text-right mt-5"><ButtonStyleLink to="/menu"><ButtonBack>กลับสู่หน้าหลัก</ButtonBack></ButtonStyleLink></div>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}

const display = (error) => {
  if(error)
    return <Redirect
              to={{
                pathname: "/error",
                state: { from: locationNow }
              }}
            />;
  else
    return <Loading />;
}


const Landing = (props) => {
  return (
    
    <div>
      {display(props.error)}
    </div>
    )
  };

export default Landing;