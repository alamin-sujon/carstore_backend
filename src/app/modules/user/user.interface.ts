export type TUser = {
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  status: 'active' | 'blocked';
};

export type TLoginUser = {
  email: string;
  password: string;
};

export type TPasswordChange = {
  password: string;
  newPassword: string;
};
