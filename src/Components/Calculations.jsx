import { useState } from "react"

import "../Styles/calculations.css"

const Calculations = () => {
    const [input, setInput] = useState([])
    const [output, setOutput] = useState([])

    const handleButtonClick = (e) => {
        setInput(e)
        console.log(input)
    }


    return (
        <>
         <div>
            <h1 className="calculator-h1" style={{textAlign: 'center'}}>This is the Calculations component</h1>
            <div className="calculator-box">
                <div className="calculator-display">
                   
                </div>
             <div className="button-grid">
                {['7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', 'C', '0', '.', '=', '+'].map((btn) => (
                <button key={btn} onClick={() => handleButtonClick(btn)}>
                    {btn}
                </button>
                    ))}
             </div>
          </div>
        </div>
        </>
    )
}

export default Calculations