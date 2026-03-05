import {type ReactElement, useState, type MouseEvent} from 'react'
import './App.css'
import {createExercise} from "./exercises/createExercise.tsx";
import {ChangeOrientationIcon} from "./components/ChangeOrientationIcon.tsx";
import {sounds} from "./components/sounds.ts";
import {Dialog} from "@mui/material";
import {dumpScore, resetScore} from "./score.tsx";

export interface ExerciseProps {
  feedback: boolean | null;
  showFeedback: (correct: boolean, onDelayFinished: () => void) => void;
  showNextExercise: () => void;
}

export type Exercise = (props: ExerciseProps) => ReactElement;

const myRed = "#f88";
const myGreen = "#8f8";
const myTransparent = "rgba(0,0,0,0)";

export function App() {
  const [exercise, setExercise] = useState<Exercise>(createExercise);
  const [count, setCount] = useState(0);
  const [feedback, setFeedback] = useState<boolean | null>(null);
  const [feedbackColor, setFeedbackColor] = useState(myTransparent);

  function showFeedback(correct: boolean, onDelayFinished: () => void) {

    function onTimeout() {
      setFeedback(null);
      setFeedbackColor(myTransparent);
      onDelayFinished();
    }

    setFeedback(previous => {
      if (previous !== null) {
        // there is no "sane default" for handling the two onFinished() callbacks in this case
        console.error("fire(): feedback is already active");
      }
      return correct;
    });
    if (correct) {
      setFeedbackColor(myGreen);
      sounds.correct.play();
      setTimeout(onTimeout, 1000);
    } else {
      setFeedbackColor(myRed);
      sounds.wrong.play();
      setTimeout(onTimeout, 500);
    }

  }

  function showNextExercise() {
    setExercise(createExercise);
    setCount(count + 1);
  }
  
  // --- score modal ---
  
  const scoreModalSequence = [false, true, false, false, true, false, false, false, true];
  const [scoreModalIndex, setScoreModalIndex] = useState(0);
  const [scoreModalActive, setScoreModalActive] = useState(false);
  const [scoreModalContents, setScoreModalContents] = useState("");
  function onClickExerciseContainer(event: MouseEvent) {
    const isRight = event.pageX > window.innerWidth / 2;
    if (scoreModalSequence[scoreModalIndex] !== isRight) {
      setScoreModalIndex(0);
    } else if (scoreModalIndex < scoreModalSequence.length - 1) {
      setScoreModalIndex(scoreModalIndex + 1);
    } else {
      setScoreModalActive(true);
      setScoreModalIndex(0);
      setScoreModalContents(dumpScore);
    }
  }
  
  const ExerciseAsComponent = exercise;
  return <>
    <Dialog open={scoreModalActive} onClick={() => setScoreModalActive(false)} fullWidth={true}>
      <h1>Score</h1>
      <pre>{scoreModalContents}</pre>
      <button onClick={() => resetScore()} style={{ fontSize: "2em"}}>reset</button>
    </Dialog>
    <div className="exerciseContainer" style={{ backgroundColor: feedbackColor }} onClick={onClickExerciseContainer}>
      <ExerciseAsComponent key={count} feedback={feedback} showFeedback={showFeedback} showNextExercise={showNextExercise} />
    </div>
    <div className="orientationOverlay">
      <ChangeOrientationIcon />
    </div>
  </>;
}
