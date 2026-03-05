import {shuffleInPlace} from "./shuffleInPlace";

export function getShuffled<T>(array: T[]): T[] {
    array = [...array];
    shuffleInPlace(array);
    return array;
}
