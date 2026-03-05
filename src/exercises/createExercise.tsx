import type {Exercise} from "../App.tsx";
import {EinmaleinsAufgabe} from "./EinmaleinsAufgabe.tsx";

export function createExercise(): Exercise {
  return props => <EinmaleinsAufgabe
      feedback={props.feedback}
      showFeedback={props.showFeedback}
      showNextExercise={props.showNextExercise}
  />;
}
