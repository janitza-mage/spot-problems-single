// removes null from a type union
export function isNotNull<T>(x: T | null): x is T {
    return x !== null;
}
