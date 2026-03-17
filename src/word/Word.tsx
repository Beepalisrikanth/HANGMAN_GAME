import "./Word.css"

type wordProps = {
    guessLetters: string[]
    wordToGuess: string
    t:boolean
}

const Word = ({ guessLetters, wordToGuess,t }: wordProps) => {
    return (
        <div>
            <div className="WORD">
                {wordToGuess.split("").map((v, i) => (
                    <span key={i} className="letter">
                        <span className="letter2"
                            style={{
                                visibility:t ? "visible":guessLetters?.includes(v) ? "visible" : "hidden", 
                                color:guessLetters?.includes(v)?"green":"red" 
                            }}

                            >
                            {v}
                        </span>
                    </span>
                ))}
            </div>
        </div>
    )
}

export default Word
