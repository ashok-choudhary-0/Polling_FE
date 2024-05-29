const checkFieldLength = (value) => {
  return value?.trim()?.length;
};

const validatePassword = (password) => {
  const uppercaseRegex = /[A-Z]/;
  const lowercaseRegex = /[a-z]/;
  const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;

  const hasUppercase = uppercaseRegex.test(password);
  const hasLowercase = lowercaseRegex.test(password);
  const hasSpecialChar = specialCharRegex.test(password);

  return hasUppercase && hasLowercase && hasSpecialChar;
};

const validateEmail = (email) => {
  if (email?.trim()?.length < 4) {
    return false;
  } else {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
};
export { checkFieldLength, validatePassword, validateEmail };
