// import React from 'react'

import { useEffect, useState } from "react"
import "./HintsComponent.css"

type props = {
    WordToGuess: string

}

const HintsComponent = ({ WordToGuess }: props) => {
    const [dataContent, setDataContent] = useState<any[]>([]) // all data from the response
    const [cloveNumber, setCloveNumber] = useState<number>(0)
    const [hintsSet, setHintsSets] = useState<string[]>([])
    const [currentIndex, setCorrectIndex] = useState<number>(-1)
    const [hintStatus, setHintStatus] = useState<boolean>(false)

    const hints = async () => {
        try {
            const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${WordToGuess}`
            const response = await fetch(url)
            const result = await response.json()
            console.log(result)
            setDataContent(result)
            console.log("app hintData", dataContent)
            console.log(WordToGuess)
        } catch (e) {
            console.log(e)
        }
    }
    
    const hintsRevel = () => {
        const newClove = dataContent?.[0]?.meanings?.[0]?.definitions?.[cloveNumber]?.definition
        if(dataContent?.[0]?.word === WordToGuess.toLowerCase()){
            console.log(dataContent?.[0]?.word, WordToGuess)
            if (newClove) {
                const updateHints = [...hintsSet, newClove]
                setHintsSets(updateHints)
                setCorrectIndex(updateHints.length - 1)
                setCloveNumber(prev => prev + 1)
                // console.log(dataContent?.[0]?.meanings?.[0]?.definitions?.length, currentIndex+2)
                console.log(dataContent?.[0]?.meanings?.[0]?.definitions?.length,currentIndex+2,hintsSet.length+1)
            }
            setHintStatus(true)
        }

    }

    const nextHint = () => {
        if (currentIndex < hintsSet.length - 1) {
            setCorrectIndex(prev => prev + 1)
            console.log(currentIndex);
        }
    }


    const previousHint = () => {
        if (currentIndex > 0) {
            setCorrectIndex(prev => prev - 1)
            console.log(currentIndex)
        }
    }

    useEffect(() => {
        hints()
         setHintsSets([])
            setCloveNumber(0)
            setCorrectIndex(0)
            setHintStatus(false)
    }, [WordToGuess])

    return (
        <div className="outerHC">
            {hintStatus ?
                <div className="hintSection">
                    <div className="hintNumber">
                        {currentIndex + 1}
                        <div className="hint">
                            {hintsSet[currentIndex]}
                        </div>
                    </div>
                </div>
                : ""
            }
            <div className="buttonSection">
                <button onClick={previousHint} className="hintBtn" style={{opacity:(currentIndex > 0)?1:0.2}}>previous</button>
                <button onClick={hintsRevel} className="hintBtn" style={{opacity:(dataContent?.[0]?.meanings?.[0]?.definitions?.length===hintsSet.length)?0.2:1}} >hints</button>
                <button onClick={nextHint} className="hintBtn" style={{opacity:(currentIndex < hintsSet.length - 1)?1:0.2}}>next</button>
            </div>
        </div>
    )
}

export default HintsComponent
