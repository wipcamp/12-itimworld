import React from 'react'
import PropTypes from 'prop-types'

const TelNumberField = (props) => {
  return (
    <label id="telephone">
      {props.labelInput}
      <input
        type="tel" 
        id="telphone" 
        name={props.name} 
        placeholder="0800000000" 
        pattern="[0-9]{10}" 
        maxLength="10" 
        required 
        /> 
    </label>
  )
}

TelNumberField.propsTypes = {
  labelInput: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
}

export default TelNumberField
