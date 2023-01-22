export interface DecodedToken {
  exp: number;
  iat: number;
  userId: string;
}

export interface Token {
  token: string;
}
