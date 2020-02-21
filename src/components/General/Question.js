import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {Subtitle} from './../Core/Text'

const QuestionName = styled.p`
    font-weight: 500;
    font-size: 18px;
    line-height: 23px;
`

const TextArea = styled.textarea`

    width: 935px;
    height: 257px;

    background: #FFFFFF;
    border: 1px solid #E5E5E5;
    box-sizing: border-box;
    border-radius: 4px;
`

const Media = styled.audio`
  width:300px;
  @media (max-width: 576px) {
    width: 200px!important;
  }
`

const DangerSubtitle = styled(Subtitle)`
  color:red;
`

const displayAppPlayer = (id) => {
  if(id === 3){
    return (
      <div class="col-12 justify-content-start mb-2">
         <Media controls>
            <source src="/audio/WIPAudio1.m4a" type="audio/mp3" />
            <DangerSubtitle>*Browser ของท่านไม่ Support Audio Player</DangerSubtitle>
          </Media> 
      </div>
    )
  }
}

const Question = (props) => {
  return (
    <div className="form-group">
      <QuestionName className="col-12 justify-content-center">คำถามที่ {props.questionCount} : {props.questionName}</QuestionName>
      {displayAppPlayer(props.questionId)}
      <TextArea 
        className="col-12"
        name={props.questionId} 
        onChange={(e) => props.handleAnswer(e)}
        required={props.required}
        value={props.oldValue}
        >
      </TextArea>
    </div>
  )
}

Question.propType = {
    questionId: PropTypes.any,
    questionName: PropTypes.string,
    questionCount: PropTypes.number,
    handleAnswer: PropTypes.func,
    oldValue: PropTypes.string,
    required: PropTypes.bool
}

export default Question;