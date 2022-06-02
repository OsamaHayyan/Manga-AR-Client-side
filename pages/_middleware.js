import { NextResponse } from "next/server";

export default function middleware(req) {
  const { cookies, url } = req;
  if (url.includes("/user/login" || "/user/signup")) {
    const { logged_in } = cookies;
    console.log(cookies);
    if (logged_in === "true") {
      console.log("test");
      return NextResponse.redirect("/library");
    }
  }

  return NextResponse.next();
}
