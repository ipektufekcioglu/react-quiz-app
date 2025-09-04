import { useState } from "react"

export default function Homepage(props) {

    

    function handleHomepage() {
        props.onSelect(false)
    }

    return (
        <>
            <div className="homepage">
                <h1>Quizzical</h1>
                <p>Some description if needed</p>
                <button onClick={handleHomepage}>Start quiz</button>
            </div>
        </>

    )
}