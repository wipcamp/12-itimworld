import React from 'react'
import PropTypes from 'prop-types'
import {MinHeightRow} from './FieldStyle'
import styled from 'styled-components'

const LabelText = styled.div`
  width:auto;
  display:inline-block;
`

const TextField = (props) => {
  return (
      <label className={props.className} htmlFor={props.name} >
        <MinHeightRow className="row">
          <LabelText className={props.leftSide}>
            {props.labelInput}
          </LabelText>
          <div className={props.rightSide}>
            <input 
              type="text" 
              class="form-control"
              placeholder={props.placeHolder} 
              id={props.name} 
              name={props.name} 
              value={props.value}
              required={props.required}
              onChange={props.onChange}
              maxlength={props.maxlength}
              pattern={props.pattern}
              title={props.title}
              disabled={props.disabled}
            />
            <small className={props.additional}>{props.additionalText}</small>
          </div>
        </MinHeightRow>
      </label>
  )
}

TextField.propsType = {
  className: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  leftSide: PropTypes.string,
  labelInput: PropTypes.string.isRequired,
  rightSide: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  required: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  additional: PropTypes.string,
  additionalText: PropTypes.string,
  maxlength: PropTypes.string,
  pattern: PropTypes.string,
  title: PropTypes.string,
  disabled: PropTypes.bool
}

TextField.defaultProps = {
  required: true,
  disabled: false
}

export default TextField
