import { NextResponse } from "next/server";
import * as jose from "jose";

export default function middleware(req) {
  let { cookies, nextUrl } = req;

  const { superuser, admin } = jose.decodeJwt(
    cookies.get("access_token")?.value
  );

  if (
    nextUrl.pathname.startsWith("/manga-upload") ||
    nextUrl.pathname.startsWith("/chapter-upload")
  ) {
    if (superuser != true || admin != true) {
      req.nextUrl.pathname = `/404`;
      return NextResponse.rewrite(req.nextUrl);
    }
  } else if (
    cookies.has("access_token") &&
    nextUrl.pathname.startsWith("/user")
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/user/:path*", "/manga-upload", "/chapter-upload"],
};
