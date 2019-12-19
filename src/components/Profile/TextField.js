import React from 'react'

const TextField = (props) => {
  return (
      <label className={props.className}>
        {props.labelInput}
        <input type={props.type} placeholder={props.placeHolder} name={props.name} required />
      </label>
  )
}

export default TextField
