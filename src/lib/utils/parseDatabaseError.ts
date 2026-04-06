export default function parseDatabaseError(e: any) {
  const errorMessage = JSON.parse(e.message);

  let newError = "";

  if (errorMessage.message !== "Validation error") {
    newError = errorMessage.message;
  }

  for (let field in errorMessage.errors) {
    for (let err in errorMessage.errors[field]) {
      newError += (newError ? "\n" : "") + errorMessage.errors[field][err];
    }
  }

  return newError;
}
