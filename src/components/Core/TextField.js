import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'


const TextField = (props) => {
  return (
      <label className={props.className} htmlFor={props.name} >
        <div className="row">
          <div className={props.leftSide} >
            {props.labelInput}
          </div>
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
            />
            <small className={props.additional}>{props.additionalText}</small>
          </div>
        </div>
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
  required: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  additional: PropTypes.string,
  additionalText: PropTypes.string
}

TextField.defaultProps = {
  required: 'required'
}

export default TextField
