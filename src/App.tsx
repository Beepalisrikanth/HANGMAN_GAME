import { useEffect, useState } from 'react'
import './App.css'
import HangMan from './hangman/HangMan'
// import KeyBoard from './keyboard/KeyBoard'
import Word from './word/Word'
import DigitalKeyBoard from './DigitalKeyBoard/DigitalKeyBoard'



function App() {

  const words = ["ORANGE","MANGO","GRAPES","PAPAYA","PINEAPPLE","COMPUTER","KEYBOARD","MONITOR","PRINTER","MOUSE","PYTHON","JAVASCRIPT","REACT","NODE","EXPRESS","DATABASE","SERVER","CLIENT","NETWORK","SECURITY","CLOUD","DOCKER","KUBERNETES","ALGORITHM","FUNCTION","VARIABLE","OBJECT","ARRAY","STRING","BOOLEAN","NUMBER","INTEGER","FLOAT","DOUBLE","CHARACTER","PROGRAM","DEVELOPER","ENGINEER","DESIGNER","ANALYST","PROJECT","MANAGER","SYSTEM","SOFTWARE","HARDWARE","INTERNET","WEBSITE","APPLICATION","PLATFORM","SERVICE"]

  const [WordToGuess, setWordToGuess] = useState(() => (
    words[Math.floor(Math.random() * words.length)]
  )
  );


  const [guessedLetters, setGuessedLetters] = useState<string[]>([])

  function addGuessLetter(letter: string) {
    if (guessedLetters.includes(letter)) return

    setGuessedLetters(currentLetters => [...currentLetters, letter])
  }



  const inCorrectLetters = guessedLetters.filter((letter) => !WordToGuess.includes(letter))

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key

      if (!key.match(/^[a-z]$/)) { return }
      console.log(key)

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

  const [t,setT]=useState(false)
  const [resultMsg, setResultMsg] = useState<React.ReactNode>("welcome to Hangman ")

  const resultDiaplay = () => {
    const winner = WordToGuess.split("").every(l => correctLetters.includes(l))
    const loos = inCorrectLetters.length >= 6

    console.log("win", winner)
    console.log("loss", loos)

    if (winner) {
      setResultMsg(<div className='winwin'>congrulatons</div>)
      setT(true)
    }
    else if (loos) {
      setResultMsg(<div className='winwin'>you loss try again</div>)
      setT(true)
    }
    else {
      setResultMsg("keep guessing")
    }
    return resultMsg
  }
  useEffect(() => {
    resultDiaplay()
  }, [guessedLetters])



  console.log("correct", correctLetters)
  console.log("guessedLetters", guessedLetters)
  console.log("WordToGuess", WordToGuess)
  console.log("inCorrectLetters", inCorrectLetters)
  console.log(WordToGuess.split("").every(l => correctLetters.includes(l)))
  // console.log("addGuessLetter",addGuessLetter)

  return (
    <div className='outerBox' >
      <div className='innerBox'>
        <p className='title'>HangMan Game</p>
        <p className='titleTXT'>{resultMsg}</p>

        <HangMan numberOfGuesses={inCorrectLetters.length} />
        <Word guessLetters={guessedLetters} wordToGuess={WordToGuess} t={t}/>
        <DigitalKeyBoard addGuessLetter={addGuessLetter} guessedLetters={guessedLetters} wordTOGuess={WordToGuess} inCorrectLetters={inCorrectLetters} correctLetters={correctLetters} />
        {/* <KeyBoard letter={letter}/> */}
      </div>
    </div>
  )
}

export default App
