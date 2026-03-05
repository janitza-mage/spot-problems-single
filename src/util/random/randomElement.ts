import {randomInt} from "./randomInt";

export function randomElement<T>(elements: T[]): T {
    return elements[randomInt(elements.length)];
}