export default (() => {
  const required = 'This field is required';

  return {
    name: {
      required,
    },
    email: {
      required,
      pattern: {
        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        message: 'Invalid email',
      },
    },
    password: {
      required,
      pattern: {
        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        message:
          'Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:',
      },
    },
  };
})();
