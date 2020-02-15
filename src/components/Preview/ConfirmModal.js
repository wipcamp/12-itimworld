import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components'
import { Modal, ModalBody } from 'reactstrap';

import ButtonRoute from '../Core/ButtonRoute'
import { ButtonStyle } from '../Core/ButtonStyle'
import { HeaderText, Paragraph } from '../Core/Text'

const Hr = styled.hr`
  width: 557px;
  background-color:#3C3C3C;
  border: 1px solid #3C3C3C;
`
const Div = styled.div`
  margin-bottom: 2em;
`
const Body = styled(ModalBody)`
  margin-left: -7.75em;
  width: 745px;
  height: 401px;
  background: #EFEFEF;
`
const Alret = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 23px;
  text-align: center;
  color: #FF0000;
  margin-bottom: 3em;
`

const ConfirmModal = (props) => {

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <React.Fragment>
      <div className={props.className}>
        <ButtonStyle onClick={toggle} disabled={props.disabled}>ถัดไป</ButtonStyle>
      </div>
      <Modal isOpen={modal} toggle={toggle} className="d-flex justify-content-center">
        <Body>
          <HeaderText className="mt-3">ยืนยันที่จะส่งข้อมูล</HeaderText>
          <Hr/>
          <Paragraph className="row justify-content-center">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five 
          </Paragraph>
        <Alret> *หากยืนยันข้อมูล จะไม่สามารถกลับมาเเก้ไขส่วนคำถามที่ตอบเเละข้อมูลสาขาได้อีก </Alret>
        <Div className="row justify-content-around ml-5 pl-4 mr-auto pr-auto">
          <ButtonStyle onClick={toggle}>Cancel</ButtonStyle>
          <ButtonRoute className="d-flex col-6" linkNext={`/success`} buttonRight="ยืนยัน" displayButtonLeft="none" />
        </Div>
        </Body>
      </Modal>
    </React.Fragment>
  );
}

ConfirmModal.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool
}

ConfirmModal.defaultProps = {
  className: 'col-6 d-inline-flex justify-content-end'
}

export default ConfirmModal;