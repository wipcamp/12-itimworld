import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components'
import { Modal, ModalBody } from 'reactstrap';

import ButtonRoute from '../Core/ButtonRoute'
import { ButtonStyle } from '../Core/ButtonStyle'

const Header = styled.h1`
  font-style: normal;
  font-weight: 500;
  font-size: 36px;
  line-height: 47px;
  text-align: center!important;
`

const Subtitle = styled.div`
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 21px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #000000;
  margin-bottom: 3em;
`
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
        <ButtonStyle onClick={toggle}>ถัดไป</ButtonStyle>
      </div>
      <Modal isOpen={modal} toggle={toggle} className="d-flex justify-content-center">
        <Body>
          <Header className="mt-3">ยืนยันที่จะเลือกสาขา</Header>
          <Hr/>
          <Subtitle className="row justify-content-center">
          {
            Object.values(props.selectedMajor).map((data,i) => (
              <React.Fragment key={i}>
                <span className="col-12" key={i}>{data}</span> 
                <br />
              </React.Fragment>
            )
            )
          }
          </Subtitle>
        <Alret> *เมื่อเลือกสาขาแล้ว สามารถย้อนกลับมา </Alret>
        <Div className="row justify-content-around ml-5 pl-4 mr-auto pr-auto">
          <ButtonStyle onClick={toggle}>Cancel</ButtonStyle>
          <ButtonRoute className="d-flex col-6" linkNext={`/questions?major=${props.majorId}`} buttonRight="ยืนยัน" displayButtonLeft="none" />
        </Div>
        </Body>
      </Modal>
    </React.Fragment>
  );
}

ConfirmModal.propTypes = {
  className: PropTypes.string,
  majorId: PropTypes.object
}

ConfirmModal.defaultProps = {
  className: 'col-6 d-inline-flex justify-content-end'
}

export default ConfirmModal;