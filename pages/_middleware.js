import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

// middleware function route :
// sever checking client before, user request send request to middleware and check jwt token earlier.

export async function middleware(req) {
	// Token will exists if user is logged in.
	const token = await getToken({ req, secret: process.env.JWT_SECRET });
	const { pathname } = req.nextUrl;
	// Allow the requests if the following is true.
	if (pathname.includes("/api/auth") || token) {
		return NextResponse.next();
	}
	if (!token && pathname !== "/login") {
		// if token is not exits, redirect to login page
		return NextResponse.redirect("/login");
	}
}
