import React from 'react'
import { nanoid } from 'nanoid'

export default function Question(props) {
  const allQuestions = (
    <div>
      {props.trivia.map((obj, questionIndex) => (
        <div className="question-container" key={nanoid()}>
          <h3>{obj.question}</h3>
          <div className="answer-choices-div">
            {obj.possibleAnswers.map((answer, optionIndex) => {
              return (
                <div
                  key={nanoid()}
                  className="answer-choice"
                  style={{
                    border:
                      (!props.showAnswers &&
                        answer ===
                          props.trivia[questionIndex].selectedAnswer) ||
                      (props.showAnswers &&
                        answer === props.trivia[questionIndex].correctAnswer)
                        ? 'none'
                        : '0.8px solid #4D5B9E',
                    backgroundColor:
                      props.showAnswers &&
                      answer !== props.trivia[questionIndex].correctAnswer &&
                      answer === props.trivia[questionIndex].selectedAnswer
                        ? 'var(--wrong-answer)'
                        : props.showAnswers &&
                          answer === props.trivia[questionIndex].correctAnswer
                        ? 'var(--correct-answer)'
                        : answer === props.trivia[questionIndex].selectedAnswer
                        ? 'var(--selected-answer)'
                        : 'var(--off-white)'
                  }}
                  onClick={() => props.selectAnswer(questionIndex, answer)}
                >
                  <p>{answer}</p>
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )

  return <div className="questions-all-container">{allQuestions}</div>
}
