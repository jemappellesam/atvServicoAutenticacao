const { userSchema } = require('../app'); 

test('valid user schema', () => {
  const validData = { email: 'test@example.com', name: 'Test User', password: 'password123' };
  expect(() => userSchema.parse(validData)).not.toThrow();
});

test('invalid user schema', () => {
  const invalidData = { email: 'invalid', name: '', password: '123' };
  expect(() => userSchema.parse(invalidData)).toThrow();
});
