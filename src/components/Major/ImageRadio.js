import React from 'react'
import PropTypes from 'prop-types';
import styled from 'styled-components'

const InputRadio = styled.label`
[type=radio] { 
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

/* IMAGE STYLES */
[type=radio] + img {
  cursor: pointer;
}

/* CHECKED STYLES */
[type=radio]:checked + img {
  /* content: url('/img/Track/website.png'); */
}
`

const ImageMajor = styled.img`
  width: 80%;
  filter: ${(props => props.isSelected?"brightness(100%)":"brightness(50%)")};
`

const ImageRadio = (props) => {
  return (
      <InputRadio className={props.className}>
        <input type="radio" name="major" value={props.value} />
        <ImageMajor src={props.imgPath}  alt={props.alt} onClick={props.onClick} isSelected={props.isSelected} />
      </InputRadio>
  )
}

ImageRadio.propsTypes = {
  className: PropTypes.string,
  imgPath: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired
}

export default ImageRadio
