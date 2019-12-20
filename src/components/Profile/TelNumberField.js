import React from 'react'

const TelNumberField = (props) => {
  return (
    <label id="telephone">
      {props.labelName}
      <input
        type="tel" 
        id="telphone" 
        name={props.name} 
        placeholder="0800000000" 
        pattern="[0-9]{10}" 
        maxlength="10" 
        required 
        /> 
    </label>
  )
}

export default TelNumberField
