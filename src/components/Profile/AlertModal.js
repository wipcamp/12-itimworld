import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components'
import { Modal, ModalBody } from 'reactstrap';

import ButtonRoute from '../Core/ButtonRoute'
import { ButtonStyle } from '../Core/ButtonStyle'
import { HeaderText, Paragrph } from '../Core/Text'

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

const AlertModal = (props) => {

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <React.Fragment>
      <div className={props.className}>
        <ButtonStyle onClick={toggle} disabled={props.disabled}>ถัดไป</ButtonStyle>
      </div>
      <Modal isOpen={modal} toggle={toggle} className="d-flex justify-content-center">
        <Body>
          <HeaderText className="mt-3">กรุณากรอกข้อมูลให้ครบถ้วน</HeaderText>
          <Hr/>
          <Paragrph className="row justify-content-center">
            ข้อมูลที่จำเป็นต้องกรอกคือ
            {/* <ul>
              {this.props.errorMsg.map((data,i) => {
              return <li> {data} </li>
              })}
            </ul> */}
          </Paragrph>
        <Div className="row justify-content-center">
          <ButtonStyle onClick={toggle}>  ปิด </ButtonStyle>
        </Div>
        </Body>
      </Modal>
    </React.Fragment>
  );
}

AlertModal.propTypes = {
  className: PropTypes.string
}

AlertModal.defaultProps = {
  className: 'col-12 d-inline-flex justify-content-end'
}

export default AlertModal;