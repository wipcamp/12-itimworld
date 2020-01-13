import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

import { ButtonStyle } from '../Core/ButtonStyle'

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
  console.log(newUser)
  return (
    <div>
      <ButtonStyle color="primary" onClick={toggle} disabled={props.disabled} >บันทึก</ButtonStyle>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <ModalBody>
          {
            Object.values(newUser).map((data, i) => (
              <React.Fragment key={i}>
                <span key={i}>{data}</span><br key={i} />
              </React.Fragment> 
            ))
          }
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>Cancel</Button>
          <Link to="/success" class="btn btn-primary" onClick={toggleWithProps}>ยืนยัน</Link>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ConfirmModal;