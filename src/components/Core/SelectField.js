import React from 'react'
import PropTypes from 'prop-types'
import { MinHeightRow } from '../Core/FieldStyle'

const SelectField = (props) => {
  return (
    <label className={props.labelClassName} htmlFor={props.selectId}>
      <MinHeightRow className="row">
        <div className={props.leftSide}>{props.labelName}</div>
        <div className={props.rightSide}>
          <div className="form-group">
            <select 
              className="form-control" 
              name={props.selectName} 
              id={props.selectId} 
              value={props.selectValue} 
              onChange={(e) => props.onClickFunc(e)} 
              required={props.required}
              disabled={props.disabled}
            >
              <option value="">เลือก</option>
              {props.dataOptions.map((data, i) => <option value={data.value} key={i}> {data.text} </option>)}
            </select>
          </div>
        </div>
      </MinHeightRow>
    </label>
  )
}

SelectField.propTypes = {
  selectId: PropTypes.string.isRequired,
  selectName: PropTypes.string.isRequired,
  selectValue: PropTypes.string,
  labelName: PropTypes.string.isRequired,
  labelClassName: PropTypes.string,
  leftSide: PropTypes.string,
  rightSide: PropTypes.string,
  onClickFunc: PropTypes.func.isRequired,
  dataOptions: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
  })),
  disabled: PropTypes.bool,
  required: PropTypes.bool
}

SelectField.defaultProps = {
  labelClassName: 'col-12 col-md-6 form-group',
  leftSide: 'col-12 col-md-4 col-form-label text-md-right',
  rightSide: 'col-12 col-md-8',
  disabled: false,
  required: true
}

export default SelectField;
