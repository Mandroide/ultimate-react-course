import {useEffect} from "react";
import {QuizActionType} from "../constants/enums.js";

export default function Timer({secondsRemaining, dispatch}) {
    const mins = Math.floor(secondsRemaining / 60);
    const seconds = secondsRemaining % 60;
    useEffect(() => {
        const id = setInterval(() => {
            dispatch({type: QuizActionType.DATA_TICK});
        }, 1000);
        return () => {
            clearInterval(id);
        }
    }, [dispatch]);
    return (
        <div className="timer">{mins >= 10 ? mins: `0${mins}`}:{seconds >= 10 ? seconds: `0${seconds}`}</div>
    )
}