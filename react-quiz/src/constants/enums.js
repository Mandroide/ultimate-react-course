export const Status = Object.freeze({
    LOADING: 0,
    ERROR: 1,
    READY: 2,
    ACTIVE: 3,
    FINISHED: 4
});

export const QuizActionType = Object.freeze({
    DATA_RECEIVED: 1,
    DATA_RESTART: 2,
    DATA_FAILED: 3,
    DATA_ACTIVE: 4,
    DATA_NEW_ANSWER: 5,
    DATA_NEXT_QUESTION: 6,
    DATA_FINISHED: 7,
    DATA_TICK: 8
})