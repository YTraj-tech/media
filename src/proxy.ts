// import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
// import { NextResponse } from "next/server";

// // ✅ Public routes (accessible without login)
// const isPublicRoute = createRouteMatcher([
//   "/",
//   "/sign-in(.*)",
//   "/sign-up(.*)",
// ]);

// export default clerkMiddleware(async (auth, req) => {
//   const { userId } = await auth();

//   // 🔓 If NOT logged in
//   if (!userId) {
//     if (isPublicRoute(req)) {
//       return NextResponse.next(); // allow public pages
//     }

//     return NextResponse.redirect(new URL("/sign-in", req.url));
//   }

//   // 🔒 If logged in → block auth pages (optional but better UX)
//   if (isPublicRoute(req)) {
//     return NextResponse.redirect(new URL("/dashboard", req.url));
//   }

//   return NextResponse.next();
// });

// export const config = {
//   matcher: [
//     '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|png|jpg|jpeg|gif|svg|woff2?|ico)).*)',
//     '/api/(.*)',
//   ],
// };



import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { User } from "../models/user.model";
import { connectDB } from "./lib/dbconnect";

// ✅ Public routes
const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
]);

// ✅ Role routes
const isAdminRoute = createRouteMatcher([
  "/Admin(.*)",
]);

const isClientRoute = createRouteMatcher([
  "/dashboard(.*)",
]);

const isWorkerRoute = createRouteMatcher([
  "/worker(.*)",
]);

export default clerkMiddleware(async (auth, req) => {

  const { userId } = await auth();

  // 🔓 Not logged in
  if (!userId) {

    if (isPublicRoute(req)) {
      return NextResponse.next();
    }

    return NextResponse.redirect(
      new URL("/sign-in", req.url)
    );
  }

  // 🔒 Logged in user cannot access auth pages
  if (isPublicRoute(req)) {
    return NextResponse.redirect(
      new URL("/dashboard", req.url)
    );
  }

  // ✅ Connect DB
  await connectDB();

  // ✅ Get user role
  const user = await User.findOne({
    clerkId: userId,
  }).select("role");

  if (!user) {
    return NextResponse.redirect(
      new URL("/", req.url)
    );
  }

  const role = user.role;

  // 🔒 Admin protection
  if (isAdminRoute(req) && role !== "Admin") {
    return NextResponse.redirect(
      new URL("/", req.url)
    );
  }

  // 🔒 Client protection
  if (isClientRoute(req) && role !== "client") {
    return NextResponse.redirect(
      new URL("/", req.url)
    );
  }

  // 🔒 Worker protection
  if (isWorkerRoute(req) && role !== "worker") {
    return NextResponse.redirect(
      new URL("/", req.url)
    );
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|png|jpg|jpeg|gif|svg|woff2?|ico)).*)',
    '/api/(.*)',
  ],
};