import React, { useState, useEffect } from 'react'
import Questions from './components/Questions'
import { decode } from 'html-entities'

function App() {
  const [startPage, setStartPage] = useState(true)
  const [fetchToggler, setFetchToggler] = useState(false)
  const [showAnswers, setShowAnswers] = useState(false)
  const [trivia, setTrivia] = useState([])
  const [selectionCount, setSelectionCount] = useState(0)
  const [userStats, setUserStats] = useState({
    numberCorrect: 0,
    totalCorrect: 0,
    gamesPlayed: 0,
    perfects: 0,
    fails: 0,
    averageScore: 0
  })
  // console.log(trivia)
  // console.log(trivia.map(obj => obj.correctAnswer))
  console.log(userStats)
  console.log(fetchToggler)
  console.log(selectionCount)

  function newGame() {
    setShowAnswers(false)
    setFetchToggler(prev => !prev)
    setSelectionCount(0)
  }

  //SET TRIVIA STATE ON PAGE LOAD
  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple")
      .then(res => res.json())
      .then(data => setTrivia(data.results.map(obj => ({
        question: decode(obj.question),
        correctAnswer: decode(obj.correct_answer),
        possibleAnswers: [...obj.incorrect_answers, obj.correct_answer]
          .map(string => decode(string))
          .sort(() => (Math.random() > .5) ? 1 : -1),
        selectedAnswer: ''
      }))))
      .catch(e => console.log(e))
  }, [fetchToggler])

  function startGame() {
    setStartPage(false)
  }

  //HANDLE SELECTING ANSWERS
  function selectAnswer(questionIndex, answer) {
    //IF GAME IS OVER
    if (showAnswers) {
      return
      //SELECTING ANSWER FOR FIRST TIME
    } else if (trivia[questionIndex].selectedAnswer !== answer
      && trivia[questionIndex].selectedAnswer === '') {
      setTrivia(prevTrivia => (
        [...prevTrivia].map((obj, i) => (
          i === questionIndex
            ? { ...prevTrivia[questionIndex], selectedAnswer: answer }
            : obj
        ))
      ))
      setSelectionCount(prev => prev + 1)
      //IF SWITCHING SELECTED ANSWERS
    } else if (trivia[questionIndex].selectedAnswer !== answer) {
      setTrivia(prevTrivia => (
        [...prevTrivia].map((obj, i) => (
          i === questionIndex
            ? { ...prevTrivia[questionIndex], selectedAnswer: answer }
            : obj
        ))
      ))
      //DESELECTING ANSWER
    } else {
      setTrivia(prevTrivia => (
        [...prevTrivia].map((obj, i) => (
          i === questionIndex
            ? { ...prevTrivia[questionIndex], selectedAnswer: '' }
            : obj
        ))
      ))
      setSelectionCount(prev => prev - 1)
    }
  }

  //COUNT HOW MANY ANSWERS ARE CORRENT AND STORE
  const correctCount = trivia.reduce((acc, obj) => {
    if (obj.correctAnswer === obj.selectedAnswer) {
      return acc + 1
    } else return acc
  }, 0)

  //CHECK ANSWERS
  function checkAnswers() {
    //IF HAVEN'T SELECTED AN ANSWER FOR ALL QUESTIONS
    if (selectionCount !== 5) {
      alert("Don't be scared, answer ALL the questions")
      return
    } else if (correctCount === 5) {
      setShowAnswers(true)
      setUserStats(prevUserStats => ({
        ...prevUserStats,
        numberCorrect: correctCount,
        totalCorrect: prevUserStats.totalCorrect + correctCount,
        gamesPlayed: prevUserStats.gamesPlayed + 1,
        perfects: prevUserStats.perfects + 1,
        averageScore: Math.floor((prevUserStats.totalCorrect + correctCount) / ((prevUserStats.gamesPlayed + 1) * 5) * 100)
      }))
    } else if (correctCount === 0) {
      setShowAnswers(true)
      setUserStats(prevUserStats => ({
        ...prevUserStats,
        numberCorrect: correctCount,
        totalCorrect: prevUserStats.totalCorrect + correctCount,
        gamesPlayed: prevUserStats.gamesPlayed + 1,
        fails: prevUserStats.fails + 1,
        averageScore: Math.floor((prevUserStats.totalCorrect + correctCount) / ((prevUserStats.gamesPlayed + 1) * 5) * 100)
      }))
    } else {
      setShowAnswers(true)
      setUserStats(prevUserStats => ({
        ...prevUserStats,
        numberCorrect: correctCount,
        totalCorrect: prevUserStats.totalCorrect + correctCount,
        gamesPlayed: prevUserStats.gamesPlayed + 1,
        averageScore: Math.floor((prevUserStats.totalCorrect + correctCount) / ((prevUserStats.gamesPlayed + 1) * 5) * 100)
      }))
    }
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
      <Questions
        trivia={trivia}
        selectAnswer={selectAnswer}
        showAnswers={showAnswers}
      />
      {!showAnswers
        ? <button
          className='trivia-button'
          onClick={checkAnswers}
        >
          Check Answers</button>
        : <div className='results-div'>
          <h4 className='results'>You scored {correctCount}/5 correct answers</h4>
          <button
            className='trivia-button'
            onClick={newGame}
          >
            New Questions</button>
        </div>
      }
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