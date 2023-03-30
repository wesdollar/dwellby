export interface ErrorResponse {
  status: number;
  error: boolean;
  errors: {
    description: string;
    onScreenDisplay: string;
  };
}
