import React, { useState, useEffect } from 'react'
import Questions from './Questions'
import { decode } from 'html-entities'

function App() {

  const [trivia, setTrivia] = useState([{
    question: '',
    correctAnswer: '',
    possibleAnswers: []
  }])

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&type=multiple")
      .then(res => res.json())
      .then(data => setTrivia(data.results.map(obj => ({
        question: obj.question,
        correctAnswer: decode(obj.correct_answer),
        possibleAnswers: [...decode(obj.incorrect_answers), decode(obj.correct_answer)].sort(() => (Math.random() > .5) ? 1 : -1)
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
      <Questions trivia={trivia} />
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