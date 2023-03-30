import { ErrorResponse } from "./types/error-response";

export const errorResponse = (
  errorResponseCode: number,
  naturalLanguageDescription: string,
  onScreenDisplay: string
): ErrorResponse => {
  return {
    status: errorResponseCode,
    error: true,
    errors: {
      description: naturalLanguageDescription,
      onScreenDisplay,
    },
  };
};
