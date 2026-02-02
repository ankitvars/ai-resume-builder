// Validation utilities for authentication forms

export interface ValidationResult {
  valid: boolean;
  error?: string;
  strength?: 'weak' | 'medium' | 'strong';
}

/**
 * Validate email address
 */
export function validateEmail(email: string): ValidationResult {
  if (!email) {
    return { valid: false, error: 'Email is required' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { valid: false, error: 'Please enter a valid email address' };
  }

  return { valid: true };
}

/**
 * Validate username
 */
export function validateUsername(username: string): ValidationResult {
  if (!username) {
    return { valid: false, error: 'Username is required' };
  }

  if (username.length < 3) {
    return { valid: false, error: 'Username must be at least 3 characters' };
  }

  if (username.length > 20) {
    return { valid: false, error: 'Username must be less than 20 characters' };
  }

  const usernameRegex = /^[a-zA-Z0-9_]+$/;
  if (!usernameRegex.test(username)) {
    return { valid: false, error: 'Username can only contain letters, numbers, and underscores' };
  }

  return { valid: true };
}

/**
 * Validate password and return strength
 */
export function validatePassword(password: string): ValidationResult {
  if (!password) {
    return { valid: false, error: 'Password is required' };
  }

  if (password.length < 8) {
    return { valid: false, error: 'Password must be at least 8 characters', strength: 'weak' };
  }

  // Calculate password strength
  let strength: 'weak' | 'medium' | 'strong' = 'weak';
  let strengthScore = 0;

  // Check for length
  if (password.length >= 8) strengthScore++;
  if (password.length >= 12) strengthScore++;

  // Check for lowercase
  if (/[a-z]/.test(password)) strengthScore++;

  // Check for uppercase
  if (/[A-Z]/.test(password)) strengthScore++;

  // Check for numbers
  if (/[0-9]/.test(password)) strengthScore++;

  // Check for special characters
  if (/[^a-zA-Z0-9]/.test(password)) strengthScore++;

  // Determine strength
  if (strengthScore >= 5) {
    strength = 'strong';
  } else if (strengthScore >= 3) {
    strength = 'medium';
  } else {
    strength = 'weak';
  }

  return { valid: true, strength };
}

/**
 * Validate password match
 */
export function validatePasswordMatch(password: string, confirmPassword: string): ValidationResult {
  if (!confirmPassword) {
    return { valid: false, error: 'Please confirm your password' };
  }

  if (password !== confirmPassword) {
    return { valid: false, error: 'Passwords do not match' };
  }

  return { valid: true };
}

/**
 * Get password strength color for UI
 */
export function getPasswordStrengthColor(strength: 'weak' | 'medium' | 'strong' | undefined): string {
  switch (strength) {
    case 'weak':
      return '#F44336'; // error.main
    case 'medium':
      return '#FF9800'; // warning.main
    case 'strong':
      return '#4CAF50'; // success.main
    default:
      return '#9E9E9E'; // grey
  }
}

/**
 * Get password strength percentage for progress bar
 */
export function getPasswordStrengthPercentage(strength: 'weak' | 'medium' | 'strong' | undefined): number {
  switch (strength) {
    case 'weak':
      return 33;
    case 'medium':
      return 66;
    case 'strong':
      return 100;
    default:
      return 0;
  }
}