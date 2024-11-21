import { NextResponse } from "next/server";

export function middleware(request) {
  const role = request.cookies.get("role")?.value;

  const url = request.nextUrl.pathname;

  if (!role && url.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // Contoh validasi role untuk halaman tertentu
  if (role !== "super-admin" && url.startsWith("/admin/user-management")) {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  return NextResponse.next();
}
