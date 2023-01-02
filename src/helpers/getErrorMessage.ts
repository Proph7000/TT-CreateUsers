import { emptyField } from './errorMessages';

export const getErrorMessage = (
  isError: boolean,
  isEmpty: boolean,
  errorMessage: string,
): string | null => {
  if (isEmpty) {
    return emptyField;
  }

  if (isError) {
    return errorMessage;
  }

  return null;
};
