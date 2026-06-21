/**
 * @typedef {Object} ValidationResult
 * @property {boolean} valid - Whether the input is valid
 * @property {string} error - The error message if invalid
 */

/**
 * Validates a user's name to ensure it is not empty and contains only letters and spaces.
 * 
 * @param {string} name - The name string to validate
 * @returns {ValidationResult} The result of the validation
 */
export function isValidName(name) {
  const trimmedName = name.trim();
  if (!trimmedName) return { valid: false, error: "Please enter a valid name." };
  if (!/^[A-Za-z\s]+$/.test(trimmedName)) return { valid: false, error: "Names can only contain letters and spaces." };
  return { valid: true, error: "" };
}
