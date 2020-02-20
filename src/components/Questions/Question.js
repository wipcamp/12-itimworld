import React from 'react'
import PropTypes from 'prop-types';
import styled from 'styled-components'

const QuestionName = styled.p`
font-style: normal;
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

const Picture = styled.img`
  width:80%;
  min-width: 230px;
  max-width: 490px;
`

const displayFlowchart = (id) => {
  if(id === 5){
    return (
      <div className="col-12 mb-2">
        <Picture src="/img/Question/Flowchart.png" alt="Flowchart Here*" />
      </div>
    )
  }
}

const Question = (props) => {
  return (
    <div className="form-group">
      <QuestionName className="col-12 justify-content-center">คำถามที่ {props.questionCount} : {props.questionName}</QuestionName>
      {displayFlowchart(props.questionId)}
      <TextArea
        className="col-12"
        name={props.questionId}
        onChange={props.handleAnswer}
        required={props.required}
      />
    </div>
  )
}

Question.propTypes = {
    questionCount: PropTypes.number,
    questionName: PropTypes.string,
    questionId: PropTypes.any,
    handleAnswer: PropTypes.func,
    required: PropTypes.bool
}

export default Question;