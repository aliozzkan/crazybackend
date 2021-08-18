import jwt, { JwtPayload } from 'jsonwebtoken'

const secretKey = "123123";

export interface TokenData {
  email: string;
  id: number;
}

export const JwtToken = {
  createJwt: (data: TokenData) => {
    const token = jwt.sign({...data}, secretKey, { expiresIn: '1h' });
    return token;
  },
  isVerify: (token: string) => {
    return jwt.verify(token, secretKey);
  },
  getJwtData: (token: string) => {
    return jwt.decode(token, {json: true}) as unknown as JwtPayload & TokenData;
  }
}