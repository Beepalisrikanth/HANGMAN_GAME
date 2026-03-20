import { useEffect, useState } from 'react'

import HangMan from './hangman/HangMan'
import Word from './word/Word'
import DigitalKeyBoard from './DigitalKeyBoard/DigitalKeyBoard'
import HintsComponent from './HintsComponent/HintsComponent'

import w1 from "./assets/male-voice-cheer-victory.wav"
import l1 from "./assets/sad-game-over.wav"

import { words } from "./words"
import './App.css'
import NavBar from './NavBar/NavBar'
import Footer from './Footer/Footer'

function App() {

  const [WordToGuess, setWordToGuess] = useState(words[Math.floor(Math.random() * words.length)]);
  const [guessedLetters, setGuessedLetters] = useState<string[]>([])
  const [wonGame,setWonGame] = useState<boolean>(false)


  const resetGame = () => {
    const randomWord = words[Math.floor(Math.random() * words.length)]
    setWordToGuess(randomWord)
    setGuessedLetters([])
    setT(false)
    setWonGame(false)
  }

  function addGuessLetter(letter: string) {
    if (guessedLetters.includes(letter)) return
    setGuessedLetters(currentLetters => [...currentLetters, letter])
  }

  const inCorrectLetters = guessedLetters.filter((letter) => !WordToGuess.includes(letter))

  useEffect(() => {
    // resultDiaplay()
    const handler = (e: KeyboardEvent) => {
      const key = e.key.toUpperCase()
      if (!key.match(/^[A-Z]$/)) { return }
      e.preventDefault()
      addGuessLetter(key)
    }
    document.addEventListener("keypress", handler)

    return () => {
      document.removeEventListener("keypress", handler)
    }
  }, [])

  const correctLetters = guessedLetters.filter(letter =>
    WordToGuess.includes(letter)
  )

  const [t, setT] = useState(false)
  const [resultMsg, setResultMsg] = useState<React.ReactNode>("welcome to Hangman ")

  const resultDiaplay = () => {
    const winner = WordToGuess.split("").every(l => correctLetters.includes(l))
    const loos = inCorrectLetters.length >= 6
    if (winner) {
      setResultMsg(<div className='winwin' >🎊Congratulations🎊<audio src={w1} autoPlay /></div>)
      setT(true)
      setWonGame(true)
  
    }
    else if (loos) {
      setResultMsg(<div className='winwin' >you loss try again<audio src={l1} autoPlay /></div>)
      setT(true)
      setWonGame(false)
    }
    else {
      setResultMsg("keep guessing")
    }
    return resultMsg
  }


  useEffect(() => {
    resultDiaplay()
    setWonGame(false)
  }, [guessedLetters])

  return (
    <div className='outerBox' >
      <div className='innerBox'>
        <NavBar/>
        <section>

        <p className='title'>HangMan Game</p>
        <div className='titleTXT' >{resultMsg}</div>

        <HangMan numberOfGuesses={inCorrectLetters.length} />
        <Word guessLetters={guessedLetters} wordToGuess={WordToGuess} t={t} />
        <DigitalKeyBoard addGuessLetter={addGuessLetter} guessedLetters={guessedLetters} wordTOGuess={WordToGuess} inCorrectLetters={inCorrectLetters} correctLetters={correctLetters} />
        <HintsComponent WordToGuess={WordToGuess} />
        <button onClick={resetGame} className='reset'>Restart</button>
        {/* {JSON.stringify(hintsData)} */}
        </section>
        <Footer/>
      </div>
    </div>
  )
}

export default App
