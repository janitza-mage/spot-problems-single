/**
 * The parameter uses type "unknown" because that's what we get in a catch clause.
 */
export function getErrorMessage(error: unknown): string | null {
  if (error instanceof Error) {
    if (error.message) {
      return error.message;
    }
  }
  return "" + error;
}
