import React from 'react'
import PropTypes from 'prop-types'

const TelNumberField = (props) => {
  return (
    <label className="col-12 col-md-6 form-group" id="telephone">
      <div className="row">
        <div className="col-12 col-md-4 col-form-label text-md-right">{props.labelInput}</div>
        <div className="col-12 col-md-8">
          <input
            className="form-control"
            type="tel" 
            id={props.name} 
            name={props.name} 
            placeholder="" 
            value={props.value}
            pattern="[0-9]{10}" 
            maxLength="10" 
            onChange={props.onChange}
            required 
            /> 
        </div>
      </div>
    </label>
  )
}

TelNumberField.propsTypes = {
  labelInput: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired
}

export default TelNumberField
