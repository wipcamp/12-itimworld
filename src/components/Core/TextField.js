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
              required={props.required ? "required" : "" }
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
  labelInput: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  required: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

export default TextField
