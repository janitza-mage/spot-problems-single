export interface WithOrderIndex {
  orderIndex: number;
}

export function compareByOrderIndex(a: WithOrderIndex, b: WithOrderIndex): number {
  return a.orderIndex - b.orderIndex;
}

// Unlike [].sort(), this does not return the argument to emphasize that the array gets sorted in-place.
export function sortByOrderIndex(elements: WithOrderIndex[]): void {
  elements.sort(compareByOrderIndex);
}
