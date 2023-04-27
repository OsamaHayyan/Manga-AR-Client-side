import { decodeJwt } from "jose";
import { userType } from "./interfaces";

const userParser = (cookies: { [key: string]: string }) => {
  const user: userType = cookies?.access_token
    ? (decodeJwt(cookies.access_token) as unknown as userType)
    : null;
  return user;
};

export default userParser;
