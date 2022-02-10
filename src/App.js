import React from 'react'
import Question from './Question'

function App() {

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