export function promiseAll<A>(...promiseFactories: [() => Promise<A>]): Promise<[A]>;
export function promiseAll<A, B>(...promiseFactories: [() => Promise<A>, () => Promise<B>]): Promise<[A, B]>;
export function promiseAll<A, B, C>(
  ...promiseFactories: [() => Promise<A>, () => Promise<B>, () => Promise<C>]
): Promise<[A, B, C]>;
export function promiseAll<A, B, C, D>(
  ...promiseFactories: [() => Promise<A>, () => Promise<B>, () => Promise<C>, () => Promise<D>]
): Promise<[A, B, C, D]>;
export function promiseAll<A, B, C, D, E>(
  ...promiseFactories: [() => Promise<A>, () => Promise<B>, () => Promise<C>, () => Promise<D>, () => Promise<E>]
): Promise<[A, B, C, D, E]>;
export function promiseAll<A, B, C, D, E, F>(
  ...promiseFactories: [
    () => Promise<A>,
    () => Promise<B>,
    () => Promise<C>,
    () => Promise<D>,
    () => Promise<E>,
    () => Promise<F>,
  ]
): Promise<[A, B, C, D, E, F]>;
export function promiseAll<A, B, C, D, E, F, G>(
  ...promiseFactories: [
    () => Promise<A>,
    () => Promise<B>,
    () => Promise<C>,
    () => Promise<D>,
    () => Promise<E>,
    () => Promise<F>,
    () => Promise<G>,
  ]
): Promise<[A, B, C, D, E, F, G]>;
export function promiseAll<A, B, C, D, E, F, G, H>(
  ...promiseFactories: [
    () => Promise<A>,
    () => Promise<B>,
    () => Promise<C>,
    () => Promise<D>,
    () => Promise<E>,
    () => Promise<F>,
    () => Promise<G>,
    () => Promise<H>,
  ]
): Promise<[A, B, C, D, E, F, G, H]>;

/**
 * Awaits all of a tuple of promises. This function handles the case of running multiple heterogeneous promises
 * in parallel. Use promiseAllMap() if you have an array of homogeneous promises generated from a data array and
 * an asynchronous mapper.
 *
 * This function should be used over Promise.all() because it adds safety against unhandled rejections if creating
 * one of the promises fails synchronously. Consider the following scenario:
 *
 * ```ts
 * await Promise.all([
 *   myAsyncFunction1(),
 *   myAsyncFunction2(computeArgs()),
 * ]);
 * ```
 *
 * If `computeArgs()` throws an error (synchronously), then the promise already created by `myAsyncFunction1()` will be
 * unhandled. If that promise then rejects, the rejection will be unhandled and at least generate a nasty error, and
 * at worst (based on Node/Deno settings) crash the whole process.
 *
 * This function solves the problem by taking functions that create the promises. It adds a rejection handler to each
 * of them immediately, so that if one of them throws an error, the previously created promises already have such a
 * handler.
 *
 * Besides that, this function fixes the broken typing of Promise.all and doesn't require square brackets for its
 * arguments.
 */
export function promiseAll(...promiseFactories: (() => Promise<unknown>)[]): Promise<unknown[]> {
  const promises: Promise<unknown>[] = [];
  for (const promiseFactory of promiseFactories) {
    const promise = promiseFactory();
    // This error handle gets attached to the invidual promises, so if the promise factories fails synchronously,
    // the promises are considered handled and do not cause an unhandled rejection that crashes Node. However,
    // we do not push the promise returned from .catch() to the promises array, but the original one, which leaves
    // the error visible, so it still causes Promise.all() to reject too. The final puzzle piece is that while we
    // store the individual promises in the array, we do NOT attach a .then() handler to any of them, because if we
    // did, then an error in the original promise would also cause the .then() handler to throw, and THAT would be
    // an unhandled rejection. A .then() handler doesn't get attached until the call to Promise.all(), and at that
    // point, nothing is left to be done that could throw synchronously.
    promise.catch(() => {
      // do nothing, just prevent unhandled rejection.
    });
    promises.push(promise);
  }
  return Promise.all(promises);
}
