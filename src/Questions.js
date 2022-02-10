import React from "react"
import { nanoid } from 'nanoid'

export default function Question(props) {

    // console.log(props.trivia[0].correctAnswer)
    // console.log(props.trivia[0].possibleAnswers)

    const allQuestions = (
        <div>
            {props.trivia.map(obj => (
                <div className="question-container" key={nanoid()}>
                    <h3>{obj.question}</h3>
                    <div className="answer-choices-div">
                        {obj.possibleAnswers.map((answer, i) => (
                            <div className="answer-choice" key={nanoid()} id={nanoid()}>
                                <p>{answer}</p>
                            </div >
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )

    return (
        <div className="questions-all-container">
            {allQuestions}
        </div>
    )
}