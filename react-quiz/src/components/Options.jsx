export default function Options({question, dispatch, answer}) {
    const hasAnswered = answer !== null;

    function getClassName(index) {
        let result = "";
        if (hasAnswered) {
            if (index === answer) {
                result = result + " answer";
            }

            result = result + (index === question.correctOption ? " correct" : " wrong");
        }

        return result;
    }

    return (
        <div className="options">
            {question.options.map((option, index) => (
                <button key={option} disabled={hasAnswered}
                        className={`btn btn-option${getClassName(index)}`}
                        onClick={() => dispatch({type: "DATA_NEW_ANSWER", payload: index})}>{option}</button>))}
        </div>
    );
}