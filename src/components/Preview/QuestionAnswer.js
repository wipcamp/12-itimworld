import React from 'react'
import PropTypes from 'prop-types'
import Styled from 'styled-components'

const Topic = Styled.h3`
    display: block;

    font-family: Sarabun;
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 21px;

    color: #000000;
`

const Data = Styled.p`
    display: block;

    font-family: Sarabun;
    font-style: normal;
    font-weight: 300;
    font-size: 16px;
    line-height: 21px;

    color: #000000;
`
const QuestionAnswer = props => {
    return (
        <div className="mb-5">
            <Topic>คำถามที่ {props.count + 1} : {props.topic}</Topic>
            <Data>{props.data}</Data>
        </div>
    )
}

QuestionAnswer.propTypes = {
    topic: PropTypes.string.isRequired,
    count: PropTypes.number,
    data: PropTypes.any
}

export default QuestionAnswer