import React, { useState } from 'react'
import styled from 'styled-components'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

import { HeaderText , Subtitle } from '../Core/Text'
import { ButtonStyle, ButtonStyleLink } from '../Core/ButtonStyle'

const SubHeader = styled(HeaderText)`
  font-size: 24px;
`
const Body = styled(ModalBody)`
  margin-left: -19.5em;;
  width: 1125px;
  height: 580px;  
  background: #EFEFEF;
`
const Div = styled.div`
  margin-bottom: 2em;
`
const EditData = styled.div`
  width: 775px;
  height: 189.33px;
  background: #FFFFFF;
`
const ConfirmModal = (props) => {
  const { 
    newUser,
    className
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal)

  const toggleWithProps = () => {
    setModal(!modal)
    props.onClick()
  }
  return (
    <div>
      <ButtonStyle color="primary" onClick={toggle} disabled={props.disabled} >บันทึก</ButtonStyle>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <Body>
          <HeaderText className="col-12">ยืนยันที่จะแก้ไขข้อมูล</HeaderText>
          <div className="row justify-content-center mb-5">
            <Subtitle className="col-8 ">
              Lorem Ipsum is simply dummy text of the printing and
              typesetting industry. Lorem Ipsum has been the industry's
              standard dummy text ever since the 1500s,
          </Subtitle>
            <SubHeader className="d-flex justify-content-start col-8"> ข้อมูลที่ท่านแก้ไขมีดังนี้ </SubHeader>
            <EditData className="col-8">
              {
                Object.values(newUser).map((data, i) => (
                  <React.Fragment key={i}>
                    <span key={i}>{data}</span><br key={i} />
                  </React.Fragment>
                ))
              }
            </EditData>
          </div>
        <Div className="d-flex justify-content-between ml-5 pl-4 mr-5 pr-4">
          <ButtonStyle color="secondary" onClick={toggle}>Cancel</ButtonStyle>
          <ButtonStyleLink to="/success" class="btn btn-primary" onClick={toggleWithProps}>ยืนยัน</ButtonStyleLink>
        </Div>
        </Body>
      </Modal>
    </div>
  );
}

export default ConfirmModal;