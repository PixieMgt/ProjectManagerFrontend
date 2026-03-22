export default function parseError(e: any) {
  const errorMessage = JSON.parse(e.message);
  let newError = errorMessage.message;
  for (let e in errorMessage.errors) {
    for (let err in errorMessage.errors[e]) {
      newError += "\n" + errorMessage.errors[e][err];
    }
  }
  return newError;
}
