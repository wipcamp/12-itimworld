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
                            console.log(i)
                            return <Question questionCount={i+1}  questionId={data.questionId}  ans={data.ans}/>
                        })}
                </div>
                <ButtonRoute buttonRight="back" buttonLeft="Submit" />
                
            </React.Fragment>
        )
    }
}
