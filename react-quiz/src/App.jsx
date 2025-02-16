import Header from "./components/Header.jsx";
import Content from "./components/Content.jsx";
import {useEffect, useReducer} from "react";
import Loader from "./components/Loader.jsx";
import Error from "./components/Error.jsx";
import StartScreen from "./components/StartScreen.jsx";
import Question from "./components/Question.jsx";
import {STATUS} from "./constants/enums.js";
import NextButton from "./components/NextButton.jsx";
import Progress from "./components/Progress.jsx";
import FinishedScreen from "./components/FinishedScreen.jsx";
import Footer from "./components/Footer.jsx";
import Timer from "./components/Timer.jsx";

const initialState = {
    questions: [],
    // 'loading', 'error', 'ready', 'active', 'finished'
    status: STATUS.loading,
    index: 0,
    answer: null,
    points: 0,
    highestScore: 0,
    secondsRemaining: null,
};

const SECS_PER_QUESTION = 30

function reducer(state, action) {
    switch (action.type) {
        case "DATA_RECEIVED":
            return {
                ...state,
                status: STATUS.ready,
                questions: action.payload
            };
        case "DATA_RESTART":
            return {
                ...initialState,
                status: STATUS.ready,
                questions: state.questions,
                highestScore: state.highestScore
            };
        case "DATA_FAILED":
            return {
                ...state,
                status: STATUS.error
            };
        case "DATA_ACTIVE": {
            return {
                ...state,
                status: STATUS.active,
                secondsRemaining: state.questions.length * SECS_PER_QUESTION
            };
        }

        case "DATA_NEW_ANSWER": {
            const question = state.questions[state.index];
            return {
                ...state,
                answer: action.payload,
                points: action.payload === question.correctOption ? question.points + state.points : state.points,
            }
        }
        case "DATA_NEXT_QUESTION": {
            return {
                ...state,
                answer: null,
                index: state.index + 1,
            }
        }
        case "DATA_FINISHED": {
            return {
                ...state,
                status: STATUS.finished,
                answer: null,
                highestScore: state.points > state.highestScore ? state.points : state.highestScore
            }
        }
        case "DATA_TICK":
            return {
                ...state,
                status: state.secondsRemaining > 0 ? state.status : STATUS.finished,
                secondsRemaining: state.secondsRemaining - 1,
            }
        default:
            throw new Error(`Unknown action type ${action.type}`);
    }
}

export default function App() {
    const [{
        questions,
        index,
        status,
        answer,
        points,
        highestScore,
        secondsRemaining
    }, dispatch] = useReducer(reducer, initialState);
    const numQuestions = questions.length;
    const maxPossiblePoints = questions.reduce((acc, question) => acc + question.points, 0);
    useEffect(() => {
        const controller = new AbortController();

        async function fetchQuestions() {
            const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/questions/`, {
                signal: controller.signal
            });
            const data = await res.json();
            dispatch({payload: data, type: "DATA_RECEIVED"});
        }

        fetchQuestions().catch((err) => {
            if (err.name !== 'AbortError') {
                console.error(err.message);
                dispatch({type: "DATA_FAILED"})
            }
        });

        return () => {
            controller.abort();
        }
    }, []);

    return (
        <div className="app">
            <Header/>
            <Content>
                {status === STATUS.loading && <Loader/>}
                {status === STATUS.error && <Error/>}
                {status === STATUS.ready && (<StartScreen numQuestions={numQuestions} dispatch={dispatch}/>)}
                {status === STATUS.active && (<>
                    <Progress index={index} numQuestions={numQuestions} dispatch={dispatch} points={points}
                              maxPossiblePoints={maxPossiblePoints} answer={answer}/>
                    <Question question={questions[index]} dispatch={dispatch} answer={answer}/>
                    <Footer>
                        <Timer dispatch={dispatch} secondsRemaining={secondsRemaining}/>
                        <NextButton dispatch={dispatch} answer={answer} index={index} numQuestions={numQuestions}/>
                    </Footer>
                </>)}
                {status === STATUS.finished && <FinishedScreen points={points} maxPossiblePoints={maxPossiblePoints}
                                                               highestScore={highestScore} dispatch={dispatch}/>}
                {/*<p>1/{state.questions?.length}</p>*/}
                {/*<p>{state.questions?.[0]}</p>*/}
            </Content>
        </div>
    )
}