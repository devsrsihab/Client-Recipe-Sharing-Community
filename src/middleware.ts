import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getCurrentuser } from "./services/AuthService";
import { IUser } from "./types/post.type";

const AuthRoutes = ["/auth/login", "/auth/register"];
// role based routes
const RoleBasedRoutes = {
  admin: [/^\/admin/],
  user: [/^\/user/, /^\/myprofile/],
};

type TRole = keyof typeof RoleBasedRoutes;

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const user: Partial<IUser> | null = await getCurrentuser();

  if (!user) {
    if (AuthRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(
        new URL(`/auth/login?redirect=${pathname}`, request.url)
      );
    }
  }

  // if user role have based route
  if (user?.role && RoleBasedRoutes[user.role as TRole]) {
    const routes = RoleBasedRoutes[user.role as TRole];
    if (routes.some((route) => pathname.match(route))) {
      return NextResponse.next();
    }
  }

  // If the user is not authorized for the current route, redirect to home
  return NextResponse.redirect(new URL("/", request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/user",
    "/myprofile",
    "/user/:page*",
    "/admin",
    "/admin/:page*",
    "/auth/login",
    "/auth/register",
  ],
};
