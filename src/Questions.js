import React from "react"
import { nanoid } from 'nanoid'
import { decode } from 'html-entities'

export default function Question(props) {
    const randomIndex = [0, 1, 2, 3].sort(() => (Math.random() > .5) ? 1 : -1);

    console.log(randomIndex)
    console.log(props.trivia[0].possibleAnswers)

    const allQuestions = (
        <div>
            {props.trivia.map(obj => (
                <div className="question-container" key={nanoid()}>
                    <h3>{decode(obj.question)}</h3>
                    <div className="answer-choices-div">
                        {obj.possibleAnswers.map((answer, i) => (
                            < div className="answer-choice" key={nanoid()} id={nanoid()}>
                                <p>{decode(obj.possibleAnswers[randomIndex[i]])}</p>
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