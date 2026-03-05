import style from "./Keypad.module.css";

export interface KeypadProps {
  feedback: boolean | null;
  input: string;
  setInput(input: string): void;
  onFinish(value: number): void;
}

export function Keypad(props: KeypadProps) {

  const handleDigit = (digit: string | number) => {
    if (props.input.length < 5) {
      props.setInput(String(props.input) + String(digit));
    }
  };

  const handleErase = () => {
    if (props.input.length > 0) {
      props.setInput(props.input.substring(0, props.input.length - 1));
    }
  };
  
  const handleFinish = () => {
    const numericValue = props.input === "" ? 0 : Number(props.input);
    props.onFinish(numericValue);
  };
  
  const disabled = props.feedback !== null;

  return <div className={style.keypad}>
    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => (
        <button key={n} type="button" disabled={disabled} onClick={() => handleDigit(n)}>
          {n}
        </button>
    ))}
    <button type="button" disabled={disabled} onClick={handleErase} style={{fontSize: "0.8em"}}>
      ⌫
    </button>
    <button type="button" disabled={disabled} onClick={() => handleDigit("0")}>
      0
    </button>
    <button type="button" disabled={disabled} onClick={handleFinish}>
      ✓
    </button>
  </div>;
}
