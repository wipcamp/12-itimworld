import React, { useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Modal, ModalBody } from 'reactstrap'

import { HeaderText, Paragraph } from '../Core/Text'
import { ButtonStyle} from '../Core/ButtonStyle'

const SubHeader = styled(HeaderText)`
  font-size: 24px;
`
const Body = styled(ModalBody)`
  margin-left: -19.5em;;
  width: 1125px;
  min-height: 580px;  
  height: auto;  
  background: #EFEFEF;
`
const Div = styled.div`
  margin-bottom: 2em;
`
const EditData = styled.div`
  width: 775px;
  min-height: 189.33px;
  height: auto;
  background: #FFFFFF;
`
const ConfirmModal = (props) => {

  const [modal, setModal] = useState(false);

  const toggleWithProps = () => {
    setModal(!modal)
    props.onClick()
  }
  return (
    <div>
      <ButtonStyle color="primary" onClick={props.onClickButton} disabled={props.disabled} >บันทึก</ButtonStyle>
      <Modal isOpen={props.modal} toggle={props.toggleModal} className={props.className}>
        <Body>
          <HeaderText className="col-12">ยืนยันที่จะแก้ไขข้อมูล</HeaderText>
          <div className="row justify-content-center mb-5">
            <Paragraph className="col-8 ">
              Lorem Ipsum is simply dummy text of the printing and
              typesetting industry. Lorem Ipsum has been the industry's
              standard dummy text ever since the 1500s,
          </Paragraph>
            <SubHeader className="d-flex justify-content-start col-8"> ข้อมูลที่ท่านแก้ไขมีดังนี้ </SubHeader>
            <EditData className="col-8">
              {props.displayText.map(element => {
                return <p>{element}</p>;
              })}
            </EditData>
          </div>
        <Div className="d-flex justify-content-between ml-5 pl-4 mr-5 pr-4">
          <ButtonStyle color="secondary" onClick={props.toggleModal}>Cancel</ButtonStyle>
          <ButtonStyle onClick={toggleWithProps}>ยืนยัน</ButtonStyle>
        </Div>
        </Body>
      </Modal>
    </div>
  )
}

ConfirmModal.propsType = {
  disabled: PropTypes.bool,
  displayText: PropTypes.array,
  modal: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  onClickButton: PropTypes.func.isRequired

}

ConfirmModal.defaultProps = {
  displayText: []
}

export default ConfirmModal;