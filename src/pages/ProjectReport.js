import React from 'react'
import {useNavigate} from 'react-router-dom'

function ProjectReport() {
    const navigate = useNavigate()

    return (
        <div className="flex flex-row justify-center items-center p-20px">
            Project Report
            <button onClick={() => {navigate("/")}}>Home</button>
            <button onClick={() => {navigate("/inputForm")}}>Input Form</button>
            <button onClick={() => {navigate("/contributions")}}>Contributions</button>
        </div>
    )
}

export default ProjectReport