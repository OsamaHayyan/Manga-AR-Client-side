import { NextResponse } from "next/server";
import * as jose from "jose";

export default function middleware(req) {
  let { cookies, nextUrl } = req;

  const { superuser, admin } = cookies.has("access_token")
    ? jose.decodeJwt(cookies.get("access_token")?.value)
    : { superuser: null, admin: null };

  if (
    nextUrl.pathname.startsWith("/manga-upload") ||
    nextUrl.pathname.startsWith("/chapter-upload")
  ) {
    if (superuser != true || admin != true) {
      return NextResponse.rewrite(new URL("/404", nextUrl));
    }
  }

  if (cookies.has("access_token") && nextUrl.pathname.startsWith("/user")) {
    return NextResponse.redirect(new URL("/", req.url));
  }
}

export const config = {
  matcher: ["/user/:path*", "/manga-upload", "/chapter-upload"],
};
