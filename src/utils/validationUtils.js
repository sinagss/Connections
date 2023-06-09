export const isValidEmail = (email) => {
  // Use a regular expression to validate email format
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return emailRegex.test(email);
};

export const isValidPhoneNumber = (phoneNumber) => {
  // Use a regular expression to validate phone number format
  const phoneNumberRegex = /^\+\d{1,3}\(\d{2}\)\s\d{2}-\d{6}$/;
  return phoneNumberRegex.test(phoneNumber);
};
