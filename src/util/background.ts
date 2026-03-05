export function makeBackground(promiseFactory: () => Promise<unknown>): () => void {
  return () => background(promiseFactory());
}

export function background(promise: Promise<unknown> | (() => Promise<unknown>)): void {
  if (typeof promise === "function") {
    promise = promise();
  }
  promise.catch((error) => {
    console.error(error);
  });
}
