export function isValidName(name) {
  const trimmedName = name.trim();
  if (!trimmedName) return { valid: false, error: "Please enter a valid name." };
  if (!/^[A-Za-z\s]+$/.test(trimmedName)) return { valid: false, error: "Names can only contain letters and spaces." };
  return { valid: true, error: "" };
}
