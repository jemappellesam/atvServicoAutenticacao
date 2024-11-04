const { encryptPassword, comparePassword } = require('../app'); 

test('encrypt and compare password', async () => {
  const password = 'password123';
  const hashed = await encryptPassword(password);
  const match = await comparePassword(password, hashed);
  expect(match).toBe(true);
});
