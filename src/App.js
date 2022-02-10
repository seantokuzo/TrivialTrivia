import React, { useState, useEffect } from 'react'
import Question from './Question'

function App() {

  const [trivia, setTrivia] = useState([])

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&type=multiple")
      .then(res => res.json())
      .then(data => setTrivia(data.results.map(obj => ({
        question: obj.question,
        correctAnswer: obj.correct_answer,
        possibleAnswers: [...obj.incorrect_answers, obj.correct_answer]
      })))
      )
  }, [])

  console.log(trivia)

  const startPage = (
    <div className="start-div">
      <h1>Trivial Trivia</h1>
      <h4>How much trivial knowledge do you possess</h4>
      <button className="start-button">Start Game</button>
    </div>
  )

  const triviaPage = (
    <div className='trivia-container'>
      <Question />
      <Question />
      <Question />
      <Question />
      <button className='trivia-button'>Check Answers</button>
    </div>
  )

  return (
    <main>
      <div className="blob-yellow"></div>
      {/* {startPage} */}
      {triviaPage}
      <div className="blob-blue"></div>
    </main>
  )
}

export default App