import {memo, useState} from 'react';
import clickSound from './assets/ClickSound.m4a';

function calculateDuration(num, sets, speed, durationBreak) {
    return (num * sets * speed) / 60 + (sets - 1) * durationBreak;
}

function Calculator({workouts, allowSound}) {
    const [number, setNumber] = useState(workouts.at(0).numExercises);
    const [sets, setSets] = useState(3);
    const [speed, setSpeed] = useState(90);
    const [durationBreak, setDurationBreak] = useState(5);
    const [duration, setDuration] = useState(0);

    // const duration = (number * sets * speed) / 60 + (sets - 1) * durationBreak;
    const mins = Math.floor(duration);
    const seconds = (duration - mins) * 60;

    const playSound = function () {
        if (!allowSound) return;
        const sound = new Audio(clickSound);
        sound.play();
    };

    const handleUpdate = (setFunc, key) => (e) => {
        const target = +e.target.value;

        const calcDurationBy = {
            number: calculateDuration(target, sets, speed, durationBreak),
            sets: calculateDuration(number, target, speed, durationBreak),
            speed: calculateDuration(number, sets, target, durationBreak),
            durationBreak: calculateDuration(number, sets, speed, target)
        };

        setFunc(target);
        setDuration(calcDurationBy[key]);
        playSound();
    };

    function handleInc() {
        setDuration(duration => duration > 1 ? Math.floor(duration) + 1 : 0);
    }

    function handleDec() {
        setDuration(duration => duration > 1 ? Math.ceil(duration) - 1 : 0);
    }

    return (
        <>
            <form>
                <div>
                    <label>Type of workout</label>
                    <select value={number} onChange={handleUpdate(setNumber, "number")}>
                        {workouts.map((workout) => (
                            <option value={workout.numExercises} key={workout.name}>
                                {workout.name} ({workout.numExercises} exercises)
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>How many sets?</label>
                    <input
                        type='range'
                        min='1'
                        max='5'
                        value={sets}
                        onChange={handleUpdate(setSets, "sets")}
                    />
                    <span>{sets}</span>
                </div>
                <div>
                    <label>How fast are you?</label>
                    <input
                        type='range'
                        min='30'
                        max='180'
                        step='30'
                        value={speed}
                        onChange={handleUpdate(setSpeed, "speed")}
                    />
                    <span>{speed} sec/exercise</span>
                </div>
                <div>
                    <label>Break length</label>
                    <input
                        type='range'
                        min='1'
                        max='10'
                        value={durationBreak}
                        onChange={handleUpdate(setDurationBreak, "durationBreak")}
                    />
                    <span>{durationBreak} minutes/break</span>
                </div>
            </form>
            <section>
                <button onClick={handleDec}>–</button>
                <p>
                    {mins < 10 && '0'}
                    {mins}:{seconds < 10 && '0'}
                    {seconds}
                </p>
                <button onClick={handleInc}>+</button>
            </section>
        </>
    );
}

export default memo(Calculator);
