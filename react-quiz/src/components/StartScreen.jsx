export default function StartScreen({dispatch, numQuestions}) {
    return (
        <div className="start">
            <h2>Welcome to the React Quiz</h2>
            <h3>{numQuestions} questions to test your React mastery</h3>
            <button className="btn btn-ui" onClick={() => dispatch({type: "DATA_ACTIVE"})}>Let&#39;s start</button>
        </div>
    )
}