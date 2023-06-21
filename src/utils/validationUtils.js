export const isValidEmail = (email) => {
  // Use a regular expression to validate email format
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return emailRegex.test(email);
};

import { isValidNumber } from "libphonenumber-js";

export const isValidPhoneNumber = (phoneNumber) => {
  try {
    // Validate the phone number
    const parsedNumber = isValidNumber(phoneNumber);

    if (parsedNumber && parsedNumber.country === "IR") {
      return true;
    }
  } catch (error) {
    console.error("Phone number validation error:", error);
  }

  return false;
};
