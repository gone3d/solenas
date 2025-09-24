/***********
 *
 *  Shared methods
 *
 ***********/

/**
 * Format a phone number to (xxx) xxx-xxxx format
 * @param phone - The phone number as a number
 * @returns Formatted phone number string
 */
export const formatPhoneNumber = (phone: number): string => {
  const phoneStr = phone.toString();
  if (phoneStr.length === 10) {
    return `(${phoneStr.slice(0, 3)}) ${phoneStr.slice(3, 6)}-${phoneStr.slice(
      6
    )}`;
  }
  return phoneStr; // Return as-is if not 10 digits
};
