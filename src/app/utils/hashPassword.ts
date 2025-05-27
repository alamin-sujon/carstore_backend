import bcrypt from 'bcrypt';

export const hashPassword = async (password: string) => {
  console.log({ password });
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};
