import React from 'react'

const TextField = (props) => {
  return (
      <label className={props.className} for={props.name}>
        {props.labelInput}
        <input type="text" placeholder={props.placeHolder} id={props.name} name={props.name} required={props.required ? "required" : "" } />
      </label>
  )
}

export default TextField
