import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export default function middleware(req) {
  let { cookies, url } = req;
  let { superuser, admin } = cookies.access_token
    ? jwt.decode(cookies.access_token)
    : { superuser: false, admin: false };
  if (url == "/manga-upload" || url == "/chapter-upload") {
    if (superuser != true || admin != true) {
      req.nextUrl.pathname = `/404`;
      return NextResponse.rewrite(req.nextUrl);
    }
  } else if (
    cookies.access_token &&
    url.includes("/user/login" || "/user/signup")
  ) {
    return NextResponse.redirect("/library");
  }

  return NextResponse.next();
}
