import React from 'react'
import {useNavigate} from 'react-router-dom'

function Contributions() {
    const navigate = useNavigate()

    return (
        <div>
            Contributions
            <button onClick={() => {navigate("/")}}>Home</button>
            <button onClick={() => {navigate("/projectReport")}}>Project Report</button>
            <button onClick={() => {navigate("/inputForm")}}>Input Form</button>
        </div>
    )
}

export default Contributions