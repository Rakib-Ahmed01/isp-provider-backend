export type JwtPayload = {
  role: 'user' | 'admin' | 'super_admin';
  userId: string;
  iat?: number;
  exp?: number;
};
