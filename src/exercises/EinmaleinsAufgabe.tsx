import {randomInt} from "../util/random/randomInt.ts";
import {SimpleKeypadExercise} from "./SimpleKeypadExercise.tsx";
import type {ExerciseProps} from "../App.tsx";
import {type ReactElement, type ReactNode, useState} from "react";
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
    const x = randomInt(9) + 2;
    const y = randomInt(9) + 2;
    if (true) { // checks whether (x,y) is acceptable 
      return {x, y};
    }
  }
}

export function EinmaleinsAufgabe(props: EinmaleinsAufgabeProps) {
  const [xy, ] = useState(randomize);
  
  function onFinish(value: number) {
    const correct = value === xy.x * xy.y;
    addScore(xy.x + "*" + xy.y, correct);
    props.showFeedback(correct, () => {
      if (correct) {
        props.showNextExercise();
      }
    });
  }
  
  function renderDisplayLine(input: string): ReactNode {
    return <div style={{display: "inline-block", textAlign: "left", width: "50vh"}}>
      {xy.x} · {xy.y} = <PotentiallyCorrectedInput expectedInput={xy.x * xy.y} actualInput={input} feedback={props.feedback} />
    </div>;
  }

  return <SimpleKeypadExercise
      feedback={props.feedback}
      renderDisplayLine={renderDisplayLine}
      onFinish={onFinish}
  />;
}
