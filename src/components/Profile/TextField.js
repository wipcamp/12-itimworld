import React from 'react'
import PropTypes from 'prop-types'

const TextField = (props) => {
  return (
      <label className={props.className} htmlFor={props.name} >
        {props.labelInput}
        <input 
          type="text" 
          placeholder={props.placeHolder} 
          id={props.name} 
          name={props.name} 
          value={props.value}
          required={props.required ? "required" : "" }
          onChange={props.onChange}
        />
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
