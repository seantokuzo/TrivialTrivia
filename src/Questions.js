import React from "react"

export default function Question(props) {
    const randomIndexArray = [0, 1, 2, 3].sort(() => (Math.random() > .5) ? 1 : -1);
    
    console.log(randomIndexArray)

    

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