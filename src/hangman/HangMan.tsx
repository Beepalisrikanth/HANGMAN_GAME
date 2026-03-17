// import React from 'react'
import "./HangMan.css"

const body = () => {
    return <div className="body"></div>;
}

const head = () => (
    <div className="head"></div>
)

const leftLeg = () => {
    return <div className="leftLeg"></div>;
}

const rightLeg = () => (
    <div className="rightLeg"></div>
)

const leftHand = () => {
    return <div className="leftHand"></div>;
}

const rightHand = () => (
    <div className="rightHand"></div>
)

const hangManBody = [head,body,leftHand,rightHand,leftLeg,rightLeg]

type hangManProps = {
    numberOfGuesses:number
}

const HangMan = ({numberOfGuesses}:hangManProps) => {
    return (
        <div className='hangManSection'>
            <div className="hangManSet">
                <div className="roof hM"></div>
                <div className="rope hM"></div>
                <div className="stand hM"></div>
                <div className="base hM"></div>
                {/* {hangManBody[0]()} */}
                {hangManBody.slice(0,numberOfGuesses).map(part => part())}
            </div>
        </div>
    )
}

export default HangMan
