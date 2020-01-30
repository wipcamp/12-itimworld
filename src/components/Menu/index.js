import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Div = styled.div`
  background-color: gray;
`

const LinkStyle = styled(Link)`
  &::hover {
    text-decoration: none !important;
  }
`

const Small = styled.div`
  color: #FFFFFF !important;
  font-style: normal !important;
  font-weight: 500 !important;
  font-size: 24px !important;
  line-height: 31px !important;
`
export default class Index extends Component {

  state = {
    menu: [
      { link : 'profile' , message: 'ข้อมูลส่วนตัว' , imgBefore : '/img/Menu/person1.webp' , imgAfter : '/img/Menu/person1_done.webp' },
      { link: 'general', message: 'คำถามทั่วไป', imgBefore: '/img/Menu/question2.webp', imgAfter: '/img/Menu/question2_done.webp' },
      { link: 'major', message: 'คำถามสาขา', imgBefore : '/img/Menu/track3.webp', imgAfter : '/img/Menu/track3_done.webp' },
      { link: 'document', message: 'อัพโหลดเอกสาร', imgBefore: '/img/Menu/document4.webp', imgAfter: '/img/Menu/document4_done.webp' }
    ],
    status:true
  }

  render() {
    return (
      <Div className="d-flex justify-content-center" >
        {
          this.state.menu.map((data, i) => (
            <LinkStyle to={`/${data.link}`} className="text-center col-lg-3 col-6" key={i}>
              <img 
                src={
                      this.state.status
                      ? data.imgBefore
                      : data.imgAfter
                    }
                key={i}
                />
                {/* <div className="d-flex justify-content-center btn"> */}
                <Small className="mt-3 btn">
                  {data.message}
                </Small>
                {/* </div> */}
            </LinkStyle>
          ))
        }
      </Div>
    )
  }
}
