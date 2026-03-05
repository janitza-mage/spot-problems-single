export type PromiseResolver<T> = (value: T | PromiseLike<T>) => void;
export type PromiseRejector = (reason?: any) => void;
export type ManualPromiseTriple<T> = [Promise<T>, PromiseResolver<T>, PromiseRejector];

export function createManualPromise<T>(): ManualPromiseTriple<T> {
  let resolve: (value: T | PromiseLike<T>) => void;
  let reject: (reason?: any) => void;
  const promise = new Promise<T>((actualResolve, actualReject) => {
    resolve = actualResolve;
    reject = actualReject;
  });
  return [promise, resolve!, reject!];
}
