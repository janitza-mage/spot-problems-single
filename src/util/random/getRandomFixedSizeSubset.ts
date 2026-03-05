import {getShuffled} from "./getShuffled";

export function getRandomFixedSizeSubset<T>(array: T[], size: number) {
    array = getShuffled(array);
    while (array.length > size) {
        array.pop();
    }
    return array;
}
