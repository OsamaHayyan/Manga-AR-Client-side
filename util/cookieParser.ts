import cookie from "cookie";
import { IncomingMessage } from "http";
const cookieParser = (req: IncomingMessage) => {
  return cookie.parse(req ? req.headers.cookie || "" : document.cookie);
};
export default cookieParser;
