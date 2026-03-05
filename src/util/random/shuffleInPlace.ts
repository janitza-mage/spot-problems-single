// from: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array (slightly reformatted)
import {randomInt} from "./randomInt";

export function shuffleInPlace<T>(array: T[]): void {
    let remaining = array.length;
    while (remaining > 0) {
        const index = randomInt(remaining);
        remaining--;
        [array[remaining], array[index]] = [array[index], array[remaining]];
    }
}
