import React from "react"

export default function Question() {

    const answerChoices = (
        <div className="answer-choices-div">
            <div className="answer-choice">
                <p>Answer</p>
            </div>
            <div className="answer-choice">
                <p>Answer</p>
            </div>
            <div className="answer-choice">
                <p>Answer</p>
            </div>
            <div className="answer-choice">
                <p>Answer</p>
            </div>
        </div>
    )

    return (
        <div className="question-container">
            <h3>Hello, am I a question?</h3>
            {answerChoices}
        </div>
    )
}