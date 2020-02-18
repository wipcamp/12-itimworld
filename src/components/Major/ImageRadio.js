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
  content: url('https://images2.minutemediacdn.com/image/upload/c_crop,h_1192,w_2122,x_0,y_74/f_auto,q_auto,w_1100/v1575329078/shape/mentalfloss/609640-gettyimages-802480150.jpg');
}
`

const ImageMajor = styled.img`
  width: 80%;
  background: #C4C4C4;
  border-radius: 30px;
`

const ImageRadio = (props) => {
  return (
      <InputRadio className={props.className}>
        <input type="radio" name="major" value={props.value} />
        <ImageMajor src={props.imgPath}  alt="wow" onClick={props.onClick}/>
      </InputRadio>
  )
}

ImageRadio.propsTypes = {
  className: PropTypes.string,
  imgPath: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired
}

export default ImageRadio
