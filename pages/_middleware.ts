import { getToken } from "next-auth/jwt";
import { getSession, useSession } from "next-auth/react";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname === "/") {
    const session = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
      secureCookie: process.env.NODE_ENV === "production",
    });
    const url = req.nextUrl.clone();
    url.pathname = "/home";
    if (!session) {
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }
}

// the redirect url must be absolute :: use above funtionallity or NextResponse.redirect(new URL('/home', req.url))
