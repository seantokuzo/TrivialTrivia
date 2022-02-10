import React from "react"
import { nanoid } from 'nanoid'

export default function Question(props) {

    // console.log(props.trivia[0].correctAnswer)
    // console.log(props.trivia[0].possibleAnswers)

    const allQuestions = (
        <div>
            {props.trivia.map((obj, questionIndex) => (
                <div className="question-container" key={nanoid()}>
                    <h3>{obj.question}</h3>
                    <div className="answer-choices-div">
                        {obj.possibleAnswers.map((answer, optionIndex) => (
                            <div
                                key={nanoid()}
                                className="answer-choice"
                                style={{
                                    border: answer === props.trivia[questionIndex].selectedAnswer
                                        ? "none"
                                        : "0.8px solid #4D5B9E",
                                    backgroundColor: answer === props.trivia[questionIndex].selectedAnswer
                                        ? "var(--selected-answer)"
                                        : "var(--off-white)"
                                }}
                                onClick={() => props.selectAnswer(questionIndex, optionIndex, answer)}
                            >
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