/**
 * Awaits all of an array of promises generated from a data array and an asynchronous mapper function. Use promiseAll()
 * if you have a tuple of heterogeneous promises.
 *
 * This function should be used over Promise.all() because it adds safety against unhandled rejections if creating
 * one of the promises fails synchronously. Consider the following scenario:
 *
 * ```ts
 * await Promise.all(elements.map((element) => myAsyncFunction(computeArgs(element))));
 * ```
 *
 * If `computeArgs()` throws an error (synchronously), then the promises already created for previous elements will be
 * unhandled. If one of those promises then rejects, the rejection will be unhandled and at least generate a nasty
 * error, and at worst (based on Node/Deno settings) crash the whole process.
 *
 * This function solves the problem by taking the data elements and mapper separately and creates the promises itself.
 * It adds a rejection handler to each of them immediately, so that if the mapper throws an error, the previously
 * created promises already have such a handler.
 */
export function promiseAllMap<T, R>(
  elements: T[],
  mapper: (element: T, index: number, array: T[]) => Promise<R>,
): Promise<R[]> {
  const promises: Promise<R>[] = [];
  for (let i = 0; i < elements.length; i++) {
    const promise = mapper(elements[i], i, elements);
    promise.catch(() => {
      // do nothing, just prevent unhandled rejection -- but store the original promise below. See promiseAll() for an
      // explanation how this works.
    });
    promises.push(promise);
  }
  return Promise.all(promises);
}
