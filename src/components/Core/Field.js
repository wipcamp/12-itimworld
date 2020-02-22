import React from 'react'
import PropTypes from 'prop-types'
import { MinHeightRow } from './FieldStyle'
import styled from 'styled-components'

const RedText = styled.span`
  color: red;
`
const displayRequiredStar = (required) => {
  if (required === true)
    return <RedText> *</RedText>
}

const Field = (props) => {
  return (
    <label className={props.className} htmlFor={props.name} >
      <MinHeightRow className="row">
        <div className="col-12 col-md-4 col-form-label text-md-right">{props.labelInput}{displayRequiredStar(props.required && !props.disabled)}</div>
        <div className="col-12 col-md-8">
          <input
            className="form-control"
            type={props.type}
            id={props.name}
            name={props.name}
            placeholder={props.placeHolder}
            value={props.value}
            step={props.step}
            min={props.min}
            max={props.max}
            onChange={props.onChange}
            required={props.required}
            pattern={props.pattern}
            title={props.title}
            disabled={props.disabled}
          />
        </div>
      </MinHeightRow>
    </label>
  )
}

Field.propsTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  labelInput: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeHolder: PropTypes.string,
  value: PropTypes.string,
  step: PropTypes.string,
  min: PropTypes.string,
  max: PropTypes.string,
  required: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  pattern: PropTypes.string,
  title: PropTypes.string,
  disabled: PropTypes.bool
}

Field.defaultProps = {
  required: true,
  disabled: false
}

export default Field
