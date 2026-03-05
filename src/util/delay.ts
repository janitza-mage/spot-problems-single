export function delay(milliseconds: number, value?: any) {
  return new Promise((resolve) => {
    setTimeout(resolve.bind(null, value), milliseconds);
  });
}
