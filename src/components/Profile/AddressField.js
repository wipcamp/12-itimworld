import React from 'react'

import InputAddress from 'react-thailand-address-autocomplete'

const AddressField = (props) => {
  return (
    <InputAddress
      address={props.address}
      id={props.name}
      value={props.value}
      onChange={props.onChange}
      onSelect={props.onSelect}
      placeholder={props.placeholder}
      name={props.name}
    />
  )
}

export default AddressField
