export class MissingAuthHeaderError extends Error {
  constructor() {
    super('No auth header provided.');
  }
}
