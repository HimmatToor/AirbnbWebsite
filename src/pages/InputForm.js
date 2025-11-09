import React from 'react'
import {useNavigate} from 'react-router-dom'

function InputForm() {
    const navigate = useNavigate()

    return (
        <div>
            Input Form 
            <button onClick={() => {navigate("/")}}>Home</button>
            <button onClick={() => {navigate("/projectReport")}}>Project Report</button>
            <button onClick={() => {navigate("/contributions")}}>Contributions</button>
        </div>
    )
}

export default InputForm