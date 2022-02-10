import React, { useState, useEffect } from 'react'
import Questions from './Questions'
import { decode } from 'html-entities'

function App() {
  const [startPage, setstartPage] = useState(false)
  const [trivia, setTrivia] = useState([])

  //SET TRIVIA STATE ON PAGE LOAD
  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&type=multiple")
      .then(res => res.json())
      .then(data => setTrivia(data.results.map(obj => ({
        question: decode(obj.question),
        correctAnswer: decode(obj.correct_answer),
        possibleAnswers: [...obj.incorrect_answers, obj.correct_answer]
          .map(string => decode(string))
          .sort(() => (Math.random() > .5) ? 1 : -1)
      }))))
    .catch(e => console.log(e))
  }, [])

  
  console.log(trivia)

  function startGame() {
    setstartPage(false)
  }

  const startPageDisplay = (
    <div className="start-div">
      <h1>Trivial Trivia</h1>
      <h4>How much trivial knowledge do you possess</h4>
      <button className="start-button" onClick={startGame}>Start Game</button>
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
      {startPage ? startPageDisplay : triviaPage}
      <div className="blob-blue"></div>
    </main>
  )
}

export default App