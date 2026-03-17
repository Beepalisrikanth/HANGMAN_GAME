import "./DigitalKeyBoard.css"

const ATOZ = ["A", "B", "C", "D", "E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]

type props ={
  addGuessLetter: (letter: string) => void
  guessedLetters:String[]
  wordTOGuess:String
  inCorrectLetters:string[]
  correctLetters :string[]
}

const DigitalKeyBoard = ({addGuessLetter,guessedLetters,wordTOGuess,inCorrectLetters,correctLetters}:props) => {

  return (
    <div className="outerKeyBoard">
      <div className="Altr">{ATOZ.map((v,i)=>(
        <button className={`Eltr ${guessedLetters.includes(v)?wordTOGuess.includes(v)?"active":"inactive":""}`} key={i} onClick={()=>addGuessLetter(v)}  disabled={guessedLetters.includes(v)|| inCorrectLetters.length==6 || (wordTOGuess.split("").every(l=>correctLetters.includes(l)))}>{v}</button>
      ))}</div>
      {/* <button>refresh</button> */}
    </div>
  )
}

export default DigitalKeyBoard
