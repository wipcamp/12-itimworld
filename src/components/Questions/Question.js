import React, { Component } from 'react'
import styled from 'styled-components'

const Pink = styled.p`
    color: pink;
`
export default class Question extends Component {
		
    render() {
        return (
            <div>
            <Pink>{this.props.questionName}</Pink>
            <textarea name={this.props.questionId} onChange={this.props.handleAnswer} row="100" cols="100"></textarea>
            </div>
        )
    }
}