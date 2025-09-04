import { useEffect, useRef, useState } from "react"
import { decode } from "html-entities"
import Question from "./Question"


export default function Quiz() {
    //state variables
    const [questions, setQuestions] = useState([])
    const [quizResults, setQuizResults] = useState([])
    const [correctAnswers, setCorrectAnswers] = useState([])
    const [userAnswers, setUserAnswers] = useState([0,0,0,0,0])
    const [isQuizOver, setIsQuizOver] = useState(false)

    const score = quizResults.filter(el => el).length
    const fetchedRef = useRef(false)

    useEffect(() => {
        if (fetchedRef.current) {
            return
        } else {
            fetchedRef.current = true
            fetchData()
            
        }
        async function fetchData() {
            const res = await fetch("https://opentdb.com/api.php?amount=5&category=9&type=multiple")
            const data = await res.json()
            
            
            setQuestions(data.results.map(result => {
                const options = [...result.incorrect_answers]
                const randIndex = Math.floor(Math.random() * (options.length + 1))
                options.splice(randIndex, 0, result.correct_answer)
                return {...result, allOptions: options}
            }
            ))
            setCorrectAnswers(data.results.map(el => decode(el.correct_answer, {level:"html5"})))
            
        }
    },[isQuizOver])

    function handleSelect(item, questionIndex) {
        setUserAnswers(prev => {
            const copyPrev = [...prev]
            copyPrev[questionIndex] = item
            return copyPrev
        })
    }

    function checkResults() {
        const results = userAnswers.map((el, ind) => el === correctAnswers[ind] ? true : false)
        setQuizResults(results)
        setIsQuizOver(true)
    }

    function handleReset() {
        fetchedRef.current = false
        setIsQuizOver(false)
        console.log(correctAnswers)
    }
   

    const questionElements = questions.map((item, index) => {
        
        return <Question 
                key={index} 
                question={item.question} 
                options={item.allOptions} 
                questionIndex={index}
                quizResults={quizResults[index]}
                isQuizOver={isQuizOver}
                correctAnswer={correctAnswers[index]}
                onSelect={handleSelect}/>
    }) 

    
    return (
        <>
            <div className="question-container">
            {questionElements}
            </div>
            {!isQuizOver &&
            <button className="check-btn" onClick={checkResults}>Check Answers</button>
            }
            {isQuizOver &&
            <div className="score-container">
                <h2>You scored {score}/{quizResults.length} correct answers</h2>
                <button className="check-btn" onClick={handleReset}>Play Again</button>
            </div>
            }
        </>

    )
}