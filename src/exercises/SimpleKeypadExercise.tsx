import {type ReactNode, useState} from "react";
import {Keypad} from "../components/Keypad.tsx";

export interface SimpleKeypadExerciseProps {
  feedback: boolean | null;
  renderDisplayLine(input: string): ReactNode;
  onFinish(value: number): void;
}

export function SimpleKeypadExercise(props: SimpleKeypadExerciseProps) {
  const [input, setInput] = useState("");
  
  function onFinish(value: number) {
    if (input) {
      props.onFinish(value);
    }
  }
  
  return <div style={{ fontSize: "2em" }}>
    <div style={{textAlign: "center", marginTop: "5vh"}}>
      <div style={{display: "inline-block"}}>
        {props.renderDisplayLine(input)}
      </div>
      <br />
      <div style={{display: "inline-block", marginTop: "5vh"}}>
        <Keypad feedback={props.feedback} input={input} setInput={setInput} onFinish={onFinish} />
      </div>
    </div>
  </div>;
}
