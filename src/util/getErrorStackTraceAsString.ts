/**
 * The parameter uses type "unknown" because that's what we get in a catch clause.
 *
 * More detailed parsing of the stack trace might be added in the future. See https://v8.dev/docs/stack-trace-api
 */
export function getErrorStackTraceAsString(error: unknown): string | null {
  if (!(error instanceof Error)) {
    return null;
  }
  return error.stack ?? null;
}
