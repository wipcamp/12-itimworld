import React from 'react'
import PropTypes from 'prop-types'

import InputAddress from 'react-thailand-address-autocomplete'

const AddressField = (props) => {
  return (
    <label htmlFor={props.name}>
      {props.labelInput}
      <InputAddress
        address={props.address}
        id={props.name}
        value={props.value}
        onChange={props.onChange}
        onSelect={props.onSelect}
        placeholder={props.placeholder}
        name={props.name}
      />
    </label>
  )
}

AddressField.propsType = {
  labelInput: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
}

export default AddressField
