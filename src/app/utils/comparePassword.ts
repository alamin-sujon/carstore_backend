import bcrypt from 'bcrypt';
export const comparePassword = async (
  password: string,
  hashedPassword: string,
) => {
  const isPasswordSame = await bcrypt.compare(password, hashedPassword);
  return isPasswordSame;
};
