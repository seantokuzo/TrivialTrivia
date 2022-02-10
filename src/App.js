import React from 'react'

function App() {

    const startPage = (
    <div className="start-div">
      <h1>Trivial Trivia</h1>
      <h4>How much trivial knowledge do you possess</h4>
      <button className="start-button">Start Game</button>
    </div>
  )

  return (
    <main>
      <div className="blob-yellow"></div>
      {startPage}
      <div className="blob-blue"></div>
    </main>
  );
}

export default App;