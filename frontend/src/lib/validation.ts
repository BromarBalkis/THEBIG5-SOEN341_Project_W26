export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePassword(password: string): {
  isValid: boolean;
  strength: 'weak' | 'medium' | 'strong';
  message: string;
  percentage: number;
} {
  const length = password.length;

  if (length < 4) {
    return {
      isValid: false,
      strength: 'weak',
      message: 'Password is too weak',
      percentage: 33,
    };
  }

  if (length < 8) {
    return {
      isValid: false,
      strength: 'medium',
      message: 'Password is medium strength',
      percentage: 66,
    };
  }

  return {
    isValid: true,
    strength: 'strong',
    message: 'Password is strong',
    percentage: 100,
  };
}

export function validateUsername(
  username: string
): {
  isValid: boolean;
  message: string;
} {
  const trimmedUsername = username.trim();

  if (trimmedUsername.length < 3) {
    return {
      isValid: false,
      message: 'Username must be at least 3 characters long',
    };
  }

  const usernameRegex = /^[a-zA-Z0-9_]+$/;
  if (!usernameRegex.test(trimmedUsername)) {
    return {
      isValid: false,
      message: 'Username can only contain letters, numbers, and underscores',
    };
  }

  return {
    isValid: true,
    message: '',
  };
}

export function validateRequired(
  value: string,
  fieldName: string
): {
  isValid: boolean;
  message: string;
} {
  const trimmedValue = value.trim();

  if (trimmedValue === '') {
    return {
      isValid: false,
      message: `${fieldName} is required`,
    };
  }

  return {
    isValid: true,
    message: '',
  };
}
