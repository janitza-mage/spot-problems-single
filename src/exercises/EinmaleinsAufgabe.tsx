import {randomInt} from "../util/random/randomInt.ts";
import {SimpleKeypadExercise} from "./SimpleKeypadExercise.tsx";
import type {ExerciseProps} from "../App.tsx";
import {type ReactElement, type ReactNode, useEffect, useState} from "react";
import {addScore} from "../score.tsx";

interface PotentiallyCorrectedInputProps {
  expectedInput: ReactNode;
  actualInput: ReactNode;
  feedback: boolean | null;
}

function PotentiallyCorrectedInput(props: PotentiallyCorrectedInputProps): ReactElement {
  if (props.feedback === null) {
    return <>{props.actualInput}</>;
  } else if (props.feedback) {
    return <span style={{ color: "green" }}>{props.actualInput}</span>;
  } else {
    return <span style={{ color: "red" }}>{props.actualInput}</span>;
  }
}

// ------------------------------------------------------------

export interface EinmaleinsAufgabeProps extends ExerciseProps {
}

type Pair = {x: number, y: number};

function randomize(): Pair {
  while (true) {
    const x = randomInt(8) + 2;
    const y = randomInt(8) + 2;
    if (true) { // checks whether (x,y) is acceptable 
      return {x, y};
    }
  }
}

export function EinmaleinsAufgabe(props: EinmaleinsAufgabeProps) {
  const [xy, ] = useState(randomize);
  const [startTime] = useState(() => Date.now());
  const [hintVisible, setHintVisible] = useState(false);
  
  function onFinish(value: number) {
    const correct = value === xy.x * xy.y;
    addScore(xy.x + "*" + xy.y, correct, Date.now() - startTime);
    props.showFeedback(correct, () => {
      if (correct) {
        props.showNextExercise();
      }
    });
  }
  
  function renderDisplayLine(input: string): ReactNode {
    return <div style={{display: "inline-block", textAlign: "left", width: "50vh"}}>
      {xy.x} · {xy.y} = <div style={{ display: "inline-block", color: "#ddd", visibility: hintVisible ? "visible" : "hidden", width: "0px", overflow: "visible" }}>{xy.x * xy.y}</div><PotentiallyCorrectedInput expectedInput={xy.x * xy.y} actualInput={input} feedback={props.feedback} />
    </div>;
  }

  useEffect(() => {
    setTimeout(() => setHintVisible(true), 15 * 1000);
  }, []);

  return <SimpleKeypadExercise
      feedback={props.feedback}
      renderDisplayLine={renderDisplayLine}
      onFinish={onFinish}
  />;
}
