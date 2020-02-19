import React from 'react'
import styled from 'styled-components'
import { Modal} from 'reactstrap';
import { HeaderText, Paragraph, Subtitle } from './Text'
import PropTypes from 'prop-types'

const NoBorder = styled.div`
  border: none!important;
`

const PrimaryButton = styled.div`
  background: #0069D9;
  border: 0.2px solid #A3A3A3;
  box-sizing: border-box;
  border-radius: 4px;

  display: ${props=>props.display?props.display:"none"}!important;
`

const SecondaryButton = styled.div`
  background: #FFFFFF;
  border: 0.2px solid #A3A3A3;
  box-sizing: border-box;
  border-radius: 4px;
`

const ParagraphContext = styled(Paragraph)`
  margin-bottom: auto;
  text-align: start;
`

const HeaderContext = styled(HeaderText)`
  text-align: start;
`

const WhiteParagraphContext = styled(ParagraphContext)`
  color: #FFFFFF;
`

const DangerSubtitle = styled(Subtitle)`
  color: #FF0000;
  font-weight: bold;
`

const CustomModal = props => {
    return (
      <Modal isOpen={props.modal} toggle={props.toggle} >
        <div class="modal-content container">
          <NoBorder className="modal-header row">
            <HeaderContext className="modal-title col-12 ml-1">{props.header}</HeaderContext>
          </NoBorder>
          <div class="modal-body col-12">
              <ParagraphContext className="ml-4">
                <p>{props.paragraph}</p>
              </ParagraphContext>
              <DangerSubtitle className="ml-3">
                <p>{props.dangerSubtitle}</p>  
              </DangerSubtitle>
          </div>
          <NoBorder className="modal-footer">
            <SecondaryButton>
                <button type="button" class="btn" onClick={props.toggle}>
                  <ParagraphContext>
                    {props.secondaryButtonText}
                  </ParagraphContext>
                </button>
            </SecondaryButton>
            <PrimaryButton display={props.primaryButtonDisplay}>
              <button type="button" class="btn" onClick={props.primaryOnClick}>
                  <WhiteParagraphContext>
                    {props.primaryButtonText}
                  </WhiteParagraphContext>
                </button>
            </PrimaryButton>
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
    primaryOnClick: PropTypes.func,
    secondaryButtonText: PropTypes.string,
    dangerSubtitle: PropTypes.string
}

CustomModal.defaultProps = {
  primaryButtonText: "ยืนยัน",
  primaryOnClick: () => {},
  secondaryButtonText: "ยกเลิก",
  dangerSubtitle: ""
}

export default CustomModal
