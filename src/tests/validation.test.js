import { describe, it, expect } from 'vitest';
import { isValidName } from '../utils/validation';

describe('isValidName', () => {
  it('fails on empty string', () => {
    expect(isValidName('')).toEqual({ valid: false, error: "Please enter a valid name." });
    expect(isValidName('   ')).toEqual({ valid: false, error: "Please enter a valid name." });
  });

  it('fails on names with numbers', () => {
    expect(isValidName('John123')).toEqual({ valid: false, error: "Names can only contain letters and spaces." });
  });

  it('fails on names with special characters', () => {
    expect(isValidName('John@Doe')).toEqual({ valid: false, error: "Names can only contain letters and spaces." });
  });

  it('passes on valid names', () => {
    expect(isValidName('Jane Doe')).toEqual({ valid: true, error: "" });
    expect(isValidName('Aditi')).toEqual({ valid: true, error: "" });
  });
});
