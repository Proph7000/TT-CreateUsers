export const validatePhone = (
  phone: string,
  setIsError?: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  if (phone.includes('X') && setIsError) {
    setIsError(true);

    return false;
  }

  if (phone.includes('X') || !phone.length) {
    return false;
  }

  return true;
};
