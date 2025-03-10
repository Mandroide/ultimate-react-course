import {QuizActionType} from "../constants/enums.js";

export default function NextButton({dispatch, answer, index, numQuestions}) {
    if (answer === null) {
        return null;
    }

    if (index < numQuestions - 1) {
        return (
            <button
                className="btn btn-ui"
                onClick={() => dispatch({type: QuizActionType.DATA_NEXT_QUESTION})}>
                Next
            </button>
        );
    }

    if (index === numQuestions - 1) {
        return (
            <button
                className="btn btn-ui"
                onClick={() => dispatch({type: QuizActionType.DATA_FINISHED})}>
                Finish
            </button>
        );
    }

    return null
}