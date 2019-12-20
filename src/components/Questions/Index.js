import React, { Component } from 'react'
import ButtonRoute from '../Core/ButtonRoute'
import Question from './Question'

const arr = [
    {questionId:1,ans:'jkjdklsjd'},
    {questionId:2,ans:'fsd'},
    {questionId:3,ans:'dsds'},
];

export default class Index extends Component {
    render() {
        return (
            <React.Fragment>
                <div>
                    <form>
                        {arr.map((data,i) => {
                            return <Question key={i}  questionId={data.questionId}  ans={data.ans}/>
                        })}
                        <Question/>
                    </form>
                </div>

                <ButtonRoute bgColor="pink" buttonRight="back" buttonLeft="Submit" />
            </React.Fragment>
        )
    }
}
