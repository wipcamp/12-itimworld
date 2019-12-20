import React, { Component } from 'react'
import ButtonRoute from '../Core/ButtonRoute'
import Question from './Question'

const arr = [
	{questionId:1,ans:''},
	{questionId:2,ans:''},
	{questionId:3,ans:''},
];
export default class Index extends Component {
    render() {
        return (
            <React.Fragment>
                <div>
                        {arr.map((data,i) => {
                            return <Question key={i}  questionId={data.questionId}  ans={data.ans}/>
                        })}
                </div>
                <ButtonRoute bgColor="pink" buttonRight="back" buttonLeft="Submit" />
            </React.Fragment>
        )
    }
}
