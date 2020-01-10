import React from 'react'
import PropTypes from 'prop-types'

const Field = (props) => {
  return (
    <label className={props.className} htmlFor={props.name} >
      <div className="row">
        <div className="col-12 col-md-4 col-form-label text-md-right">{props.labelInput}</div>
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
            required={props.required ? "required" : "" } />
        </div>
      </div>
    </label>
  )
}

Field.propsTypes = {
  labelInput: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string
}

export default Field
