import { useState } from "react"

import { evaluate } from "mathjs"

import { Link} from "react-router-dom"

import "../Styles/calculations.css"

const Calculations = () => {
    const [input, setInput] = useState('')
    const [output, setOutput] = useState('')
    const [prevInput, setPrevInput] = useState('')
    const [isOperationClicked, setIsOperationClicked] = useState(false)

    

    const handleButtonClick = (e) => {
        if (e === 'C') {
            setInput('')
            setOutput('')
            setPrevInput('')
            setIsOperationClicked(false)
        } else if (e === '=') {
            try {
                const result = evaluate(input)
                setOutput(result.toString())
                setInput(result.toString())
                setPrevInput('')
                setIsOperationClicked(false)
            } catch (err) {
                setOutput("Error")
                setInput('')
                setPrevInput('')
                setIsOperationClicked(false)
            }
        } else if (["+","-","*","/"]) {
            setInput((prevInput) => prevInput + e)
        }
    }


    return (
        <>
         <div>
            <div className="calculator-box">
                <div className="calculator-display">
                   {!output ? input || 0 : 
                    output
                   }
                </div>
             <div className="button-grid">
                {['7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', 'C', '0', '.', '+', '='].map((btn) => (
                <button key={btn} onClick={() => handleButtonClick(btn)}>
                    {btn}
                </button>
                    ))}
             </div>
          </div>
          <Link to="/dashboard"><p>Back</p></Link>
        </div>
        </>
    )
}

export default Calculations