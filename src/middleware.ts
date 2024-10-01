import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getCurrentuser } from "./services/AuthService";
import { IUser } from "./types";

const AuthRoutes = ["/auth/login", "/auth/register"];
// role based routes
const RoleBasedRoutes = {
  ADMIN: [/^\/admin/],
  USER: [/^\/profile/],
};

type TRole = keyof typeof RoleBasedRoutes;

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const user: IUser | null = await getCurrentuser();

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
  if (
    (user as IUser)?.role &&
    RoleBasedRoutes[(user as IUser)?.role as TRole]
  ) {
    const routes = RoleBasedRoutes[(user as IUser)?.role as TRole];
    console.log(routes);
    if (routes.some((route) => pathname.match(route))) {
      return NextResponse.next();
    }
  }

  return NextResponse.redirect(new URL("/", request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/profile",
    // "/profile/:page*",
    "/admin",
    "/auth/login",
    "/auth/register",
  ],
};
