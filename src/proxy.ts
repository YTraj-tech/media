import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// 🌐 Public routes
const isPublicRoute = createRouteMatcher([
  "^/$",
  "/sign-in(.*)",
  "/sign-up(.*)",
]);

// 🔌 API routes
const isApiRoute = createRouteMatcher([
  "/api(.*)",
]);

// 🔐 Role routes
const isAdminRoute = createRouteMatcher(["/Admin(.*)"]);
const isWorkerRoute = createRouteMatcher(["/worker(.*)"]);
const isClientRoute = createRouteMatcher(["/dashboard(.*)"]);

// 🎯 Role → home
const roleHomeMap: Record<string, string> = {
  Admin: "/Admin",
  worker: "/worker",
  client: "/dashboard",
};

export default clerkMiddleware(async (auth, req) => {
  try {
    const { userId } = await auth();

    // ✅ Allow API
    if (isApiRoute(req)) {
      return NextResponse.next();
    }

    // 🔓 NOT LOGGED IN
    if (!userId) {
      if (isPublicRoute(req)) return NextResponse.next();
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }

    // 🔥 Fetch role
    const baseUrl =
      process.env.NEXT_PUBLIC_APP_URL ||
      `${req.nextUrl.protocol}//${req.nextUrl.host}`;

    const res = await fetch(`${baseUrl}/api/UserRole`, {
      headers: {
        cookie: req.headers.get("cookie") || "",
      },
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }

    const  data = await res.json();
    const role = data?.role
    const userHome = roleHomeMap[role] || "/";

    // 🚫 Block public routes after login
    if (isPublicRoute(req)) {
      return NextResponse.redirect(new URL(userHome, req.url));
    }

    // 🔐 STRICT ROLE CHECK (no map, just conditions)

    // 👑 Admin
    if (role === "Admin") {
      if (!isAdminRoute(req)) {
        return NextResponse.redirect(new URL("/admin", req.url));
      }
    }

    // 👷 Worker
    else if (role === "worker") {
      if (!isWorkerRoute(req)) {
        return NextResponse.redirect(new URL("/worker", req.url));
      }
    }

    // 👤 Client
    else if (role === "client") {
      if (!isClientRoute(req)) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
    }

    // ✅ Allowed
    return NextResponse.next();

  } catch (error) {
    console.error("❌ Middleware error:", error);
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|png|jpg|jpeg|gif|svg|woff2?|ico)).*)',
    '/api/(.*)',
  ],
};