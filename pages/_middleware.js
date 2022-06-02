import { NextResponse } from "next/server";

export default function middleware(req) {
  const { cookies, url } = req;
  if (url.includes("/user/login" || "/user/signup")) {
    const { logged_in } = cookies;
    if (logged_in === "true") {
      return NextResponse.redirect("/library");
    }
  }

  return NextResponse.next();
}
