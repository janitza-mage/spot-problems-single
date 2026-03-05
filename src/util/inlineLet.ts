/**
 * Allows to bind a constant name in the middle of an expression. This is useful for the content tree, which often
 * uses huge expressions -- moving part of them outside just to bind a constant name would seriously degrade
 * readability.
 */
export function inlineLet<A, B>(x: A, continuation: (x: A) => B): B {
    return continuation(x);
}
