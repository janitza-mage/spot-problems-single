export function arrayIsEmpty<T>(array: readonly T[]): array is [] {
    return array.length === 0;
}

export function arrayIsNotEmpty<T>(array: readonly T[]): array is [T, ...T[]] {
    return array.length > 0;
}
