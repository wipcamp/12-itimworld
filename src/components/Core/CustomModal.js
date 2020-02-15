import React, {useState} from 'react'
import styled from 'styled-components'
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import { HeaderText, Paragraph, Subtitle } from './Text'
import { ButtonStyle } from './ButtonStyle'
import PropTypes from 'prop-types'

const NoBorder = styled.div`
  border: none!important;
`

const PrimaryButton = styled.div`
  background: #0069D9;
  border: 0.2px solid #A3A3A3;
  box-sizing: border-box;
  border-radius: 4px;

  display: ${props=>props.primaryButtonDisplay?props.primaryButtonDisplay:"none"}!important;
`

const SecondaryButton = styled.div`
  background: #FFFFFF;
  border: 0.2px solid #A3A3A3;
  box-sizing: border-box;
  border-radius: 4px;
`

const ParagraphContext = styled(Paragraph)`
  margin-bottom: auto;
`

const WhiteParagraphContext = styled(ParagraphContext)`
  color: #FFFFFF;
`

const DangerSubtitle = styled(Subtitle)`
  color: #FF0000;
`

const CustomModal = props => {
    return (
      <Modal isOpen={props.modal} toggle={props.toggle} >
        <div class="modal-content">
          <NoBorder className="modal-header row">
            <HeaderText className="modal-title col-11 col-md-9">{props.header}</HeaderText>
            <div class="col-1 col-md-3"></div>
          </NoBorder>
          <div class="modal-body col-11 offset-1">
            <div class="ml-3">
              <ParagraphContext className="ml-3">
                <p>{props.paragraph}</p>
              </ParagraphContext>
              <DangerSubtitle className="mt-1">
                <p>{props.dangerSubtitle}</p>  
              </DangerSubtitle>
            </div>
          </div>
          <NoBorder className="modal-footer">
            <PrimaryButton>
              <button type="button" class="btn" onClick={props.toggle}>
                  <WhiteParagraphContext>
                    {props.primaryButtonText}
                  </WhiteParagraphContext>
                </button>
            </PrimaryButton>
            <SecondaryButton>
                <button type="button" class="btn" onClick={props.toggle}>
                  <ParagraphContext>
                    {props.secondaryButtonText}
                  </ParagraphContext>
                </button>
            </SecondaryButton>
          </NoBorder>
        </div>
      </Modal>
    )
}

CustomModal.propTypes = {
    modal: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired,
    header: PropTypes.string.isRequired,
    paragraph: PropTypes.string.isRequired,
    primaryButtonDisplay: PropTypes.string,
    primaryButtonText: PropTypes.string,
    secondaryButtonText: PropTypes.string,
    dangerSubtitle: PropTypes.string
}

CustomModal.defaultProps = {
  primaryButtonText: "ยืนยัน",
  secondaryButtonText: "ยกเลิก",
  dangerSubtitle: ""
}

export default CustomModal
