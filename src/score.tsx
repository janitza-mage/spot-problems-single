
export type CorrectScore = Record<string, number>;
export type WrongScore = Record<string, number>;
export type MaxTime = Record<string, number>;

export interface Score {
  correct: CorrectScore;
  wrong: WrongScore;
  maxTime: MaxTime;
}

export function getScore(): Score {
  return {
    correct: JSON.parse(localStorage.getItem("correct") ?? "{}") ?? {},
    wrong: JSON.parse(localStorage.getItem("wrong") ?? "{}") ?? {},
    maxTime: JSON.parse(localStorage.getItem("maxTime") ?? "{}") ?? {},
  };
}

export function setScore(score: Score) {
  localStorage.setItem("correct", JSON.stringify(score.correct));
  localStorage.setItem("wrong", JSON.stringify(score.wrong));
  localStorage.setItem("maxTime", JSON.stringify(score.maxTime));
}

export function adjustMaxTime(score: Score, exerciseKey: string, timeMilliseconds: number) {
  // longer times indicate a break in playing the game and should not be counted
  if (timeMilliseconds < 10 * 60 * 1000) {
    score.maxTime[exerciseKey] = Math.max(score.maxTime[exerciseKey] ?? 0, timeMilliseconds);
  }
}

export function addCorrectScore(exerciseKey: string, timeMilliseconds: number) {
  const score = getScore();
  score.correct[exerciseKey] = (score.correct[exerciseKey] ?? 0) + 1;
  adjustMaxTime(score, exerciseKey, timeMilliseconds);
  setScore(score);
}

export function addWrongScore(exerciseKey: string, timeMilliseconds: number) {
  const score = getScore();
  score.wrong[exerciseKey] = (score.wrong[exerciseKey] ?? 0) + 1;
  adjustMaxTime(score, exerciseKey, timeMilliseconds);
  setScore(score);
}

export function addScore(exerciseKey: string, correct: boolean, timeMilliseconds: number) {
  if (correct) {
    addCorrectScore(exerciseKey, timeMilliseconds);
  } else {
    addWrongScore(exerciseKey, timeMilliseconds);
  }
}

export function resetScore() {
  setScore({
    correct: {},
    wrong: {},
    maxTime: {},
  });
}

export function dumpScore(): string {
  const score = getScore();
  const keys = new Set([...Object.keys(score.correct), ...Object.keys(score.wrong)]);
  const lines = [...keys].map((key) => {
    const correct = score.correct[key] ?? 0;
    const wrong = score.wrong[key] ?? 0;
    const maxTimeText = score.maxTime[key] ? String(Math.ceil(score.maxTime[key] / 1000)) : "INF";
    return `${key},${correct},${wrong},${maxTimeText}`;
  });
  return lines.sort().join("\n");
}
