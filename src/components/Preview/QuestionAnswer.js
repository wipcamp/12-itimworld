import React from 'react'
import PropTypes from 'prop-types'
import StyledComponent from 'styled-components'

const Topic = StyledComponent.h4`
    display: block;
`

const Data = StyledComponent.p`
    display: block;
`
const QuestionAnswer = props => {
    return (
        <React.Fragment>
            <Topic>{props.topic} :</Topic>
            <Data>{props.data}</Data>
        </React.Fragment>
    )
}

QuestionAnswer.propTypes = {
    topic: PropTypes.string.isRequired
}

export default QuestionAnswer