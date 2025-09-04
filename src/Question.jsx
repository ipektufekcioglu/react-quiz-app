import { decode } from "html-entities"
import { useEffect, useState } from "react"

export default function Question(props) {
    //state variables
    const [isClicked, setIsClicked] = useState([false, false, false, false])

    //props variables
    const options = props.options
    const correctAnswer = props.correctAnswer
    const question = decode(props.question, {level: "html5"})
    

    useEffect(() => {
        setIsClicked([false, false, false, false])
    }, [question])
    

    function getAnswer(item, index) {
        setIsClicked(prev => prev.map((el, ind) => ind === index))
        props.onSelect(item, props.questionIndex)
    }


    const answerElements = options.map((item, index) => {
        const answer = decode(item, {level: "html5"})
        const styles = {
            backgroundColor : props.isQuizOver 
                ? (isClicked[index] && correctAnswer === answer) 
                ? "#94D7A2" 
                : (isClicked[index] && correctAnswer !== answer) 
                ? "#F8BCBC" 
                : (isClicked.includes(true) && !isClicked[index] && correctAnswer === answer) 
                ? "#94D7A2"
                : (!isClicked.includes(true) && correctAnswer === answer) 
                ? "#F8BCBC" 
                : "#F5F7FB"

            : isClicked[index] ? "#D6DBF5" : "#F5F7FB"}
      
        return <button 
                    key={answer}
                    onClick={() => getAnswer(answer, index)}
                    style={styles}
                    >
                    {answer}
                </button>
    }
    )

    return (
        <div className="question">
            <h2>{question}</h2>
            <div className="answer-btns">{answerElements}</div>
        </div>

    )
}