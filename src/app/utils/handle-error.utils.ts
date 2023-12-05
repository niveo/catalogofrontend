import { throwError } from 'rxjs';

export function handleError(error: any) {
  console.error(error);
  if (error.error instanceof ErrorEvent) {
    // A client-side or network error occurred. Handle it accordingly.
    console.error('An error occurred:', error.message);
  } else {
    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong,
    console.error(
      `Backend returned code ${error.status}, ` +
        `erro: ${error.message}, ` +
        `erro dev: ${error.developerMessage}, `
    );
  }
  // return an observable with a user-facing error message
  return throwError(() => error);
}
