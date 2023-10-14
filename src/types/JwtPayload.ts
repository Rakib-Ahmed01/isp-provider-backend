export type JwtPayload = {
  role: 'user' | 'admin' | 'super_admin';
  id: string;
  name: string;
  profileImg: string;
  iat?: number;
  exp?: number;
};
