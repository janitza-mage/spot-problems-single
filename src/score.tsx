
export type CorrectScore = Record<string, number>;
export type WrongScore = Record<string, number>;
export interface Score {
  correct: CorrectScore;
  wrong: WrongScore;
}

export function getScore(): Score {
  return {
    correct: JSON.parse(localStorage.getItem("correct") ?? "{}") ?? {},
    wrong: JSON.parse(localStorage.getItem("wrong") ?? "{}") ?? {},
  };
}

export function setScore(score: Score) {
  localStorage.setItem("correct", JSON.stringify(score.correct));
  localStorage.setItem("wrong", JSON.stringify(score.wrong));
}

export function addCorrectScore(exerciseKey: string) {
  const score = getScore();
  score.correct[exerciseKey] = (score.correct[exerciseKey] ?? 0) + 1;
  setScore(score);
}

export function addWrongScore(exerciseKey: string) {
  const score = getScore();
  score.wrong[exerciseKey] = (score.wrong[exerciseKey] ?? 0) + 1;
  setScore(score);
}

export function addScore(exerciseKey: string, correct: boolean) {
  if (correct) {
    addCorrectScore(exerciseKey);
  } else {
    addWrongScore(exerciseKey);
  }
}

export function resetScore() {
  setScore({
    correct: {},
    wrong: {},
  });
}

export function dumpScore(): string {
  const score = getScore();
  const keys = new Set([...Object.keys(score.correct), ...Object.keys(score.wrong)]);
  const lines = [...keys].map((key) => {
    const correct = score.correct[key] ?? 0;
    const wrong = score.wrong[key] ?? 0;
    return `${key},${correct},${wrong}`;
  });
  return lines.sort().join("\n");
}
