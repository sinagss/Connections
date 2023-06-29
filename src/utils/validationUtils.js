export const isValidEmail = (email) => {
  // Use a regular expression to validate email format
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return emailRegex.test(email);
};

import { isValidNumber, parsePhoneNumber } from "libphonenumber-js";

export const isValidPhoneNumber = (phoneNumber) => {
  try {
    const parsedNumber = parsePhoneNumber(phoneNumber, "IR");

    // Validate the phone number
    const validNumber = isValidNumber(parsedNumber.number);

    if (validNumber) {
      return true;
    }
  } catch (error) {
    console.info("Invalid phone number");
  }

  return false;
};
