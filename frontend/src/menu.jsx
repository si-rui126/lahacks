import {React, useState, useEffect} from "react";
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import './App.css';

function Menu() {
    const [selectedOption, setSelectedOption] = useState(''); // which one to send
    const [workoutData, setWorkoutData] = useState(null);
    const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
    const interval=3;
    const [timerKey, setTimerKey] = useState(0);

    useEffect(()=>{
        var btnContainer = document.getElementById("btnContainer");
        var btns = btnContainer.getElementsByClassName("radio-item");
        for (var i = 0; i < btns.length; i++) {
          btns[i].addEventListener("click", function() {
            var current = document.getElementsByClassName("radio-item active");
            if (current.length > 0){
                current[0].className = current[0].className.replace(" active", "");
                this.className += " active";
            }
            else {
                this.className += " active";
            }
          });
        }
    })


    const handleSubmit = () => {
    fetch('http://localhost:8080/getWorkout', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json', // VERY IMPORTANT
        },
        body: JSON.stringify({ type: selectedOption }), // sending an object
    })
        .then(response => response.json())
        .then(data => {
        console.log('Input recieved:', data);
        setWorkoutData(data);
        setCurrentExerciseIndex(0);
        setTimerKey(prev => prev + 1);
        })
        .catch(error => {
        console.error('Error sending input to backend:', error);
        });
    };

  const handleComplete = () => {
    // When circle finishes
    setCurrentExerciseIndex(prevIndex => prevIndex + 1);
    setTimerKey(prev => prev + 1); // restart timer
  };

    return (
        <div>
            <div className="menu-cont" id="btnContainer">
                <p>what do you want to work on?</p>
                    <button 
                        className="radio-item"
                        value="HIIT"
                        checked={selectedOption === "HIIT"}
                        onClick={(e) => setSelectedOption(e.target.value)}  
                    >HIIT</button>
                    <button
                        className="radio-item"
                        value="Pilates"
                        checked={selectedOption === "Pilates"}
                        onClick={(e) => setSelectedOption(e.target.value)}
                    >PILATES</button>
                    <button className="radio-item"
                        value="Interval Run"
                        checked={selectedOption === "Interval Run"}
                        onClick={(e) => setSelectedOption(e.target.value)}
                    >RUN</button>
                <div>
                    <button onClick={handleSubmit}>start</button>
                </div>
            </div>
        {workoutData && currentExerciseIndex < workoutData.exercises.length && (
        <div className="workout-display">
          <h2>{workoutData.type} Workout</h2>           
            <div className="exercise-card">  
                <h3>{workoutData.exercises[currentExerciseIndex].name}</h3>
                <p>{workoutData.exercises[currentExerciseIndex].description}</p>
                {workoutData && currentExerciseIndex < workoutData.exercises.length-1 && (
                    <p>Up next: {workoutData.exercises[currentExerciseIndex + 1].name}</p>
                )}
                {workoutData && currentExerciseIndex === workoutData.exercises.length-1 && (
                    <p>You're almost done!</p>
                )}
                <div style={{ width: 200, height: 200, margin: '0 auto' }}>
                    <CountdownCircleTimer
                        key={timerKey} // key is important to restart it
                        isPlaying
                        duration={interval}
                        colors="#DF78A9"
                        onComplete={() => {
                            handleComplete();
                            return { shouldRepeat: false };
                        }}
                        >
                        {({ remainingTime }) => <div style={{ fontSize: '24px' }}>{remainingTime}s</div>}
                    </CountdownCircleTimer>
                </div>
            </div>
        </div>
      )}
      {/* --- Workout complete --- */}
        {workoutData && currentExerciseIndex >= workoutData.exercises.length && (
        <div className="end-card">
          <h4>yay good job!! you finished your workout!!</h4>
        </div>
      )}
        </div>
    );
};

export default Menu;