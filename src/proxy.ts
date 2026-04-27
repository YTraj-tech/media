


import { auth, clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { User } from "../models/user.model";
import { connectDB } from "./lib/dbconnect";

// ✅ Route matchers
const isPublicRoute = createRouteMatcher([
   '/',
  "/sign-in(.*)",
  "/sign-up(.*)",
]);

const isClientRoute = createRouteMatcher([
  "/dashboard(.*)",
   "/"
]);

const isWorkerRoute = createRouteMatcher([
  "/worker(.*)",
   "/"
]);

const isadminRoutes = createRouteMatcher([
  '/Admin(.*)',

])

const isApiRoute = createRouteMatcher([
  "/api(.*)",
]);


const clerkHandlerLogic = async ( auth:any,req: NextRequest) => {
  try {
    const path = req.nextUrl.pathname;
    console.log("🌐 PATH:", path);

    // ✅ Skip API routes
    if (isApiRoute(req)) return;

    const { userId } = await auth();

    // =========================
    // 🔓 NOT LOGGED IN
    // =========================
    if (!userId) {
      // allow only public routes
      if (isPublicRoute(req)) return;

      return NextResponse.redirect(new URL("/sign-in", req.url));
    }

    // =========================
    // 🔒 LOGGED IN USER
    // =========================

    // ❌ Block ALL public routes after login
    if (isPublicRoute(req)) {
      console.log("⛔ Logged-in user accessing public route");
    }

    // ✅ Connect DB
    await connectDB();

    const dbUser = await User.findOne({ clerkId: userId });

    if (!dbUser) {
      return NextResponse.redirect(new URL("/sign-up", req.url));
    }



    if (dbUser.role === "worker") {
      // 🚫 ONLY allow /worker
      if (!isWorkerRoute(req)) {
        console.log("⛔ Worker blocked from:", path);
        return NextResponse.redirect(new URL("/worker", req.url));
      }
    } 
    else if (dbUser.role === "client") {
      // 🚫 ONLY allow /dashboard
      if (!isClientRoute(req)) {
        console.log("⛔ Client blocked from:", path);
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
    } else if(dbUser.role==="Admin"){
        if (!isadminRoutes(req)) {
          console.log("Admin blocked from",path);
          return NextResponse.redirect(new URL('/Admin',req.url))
        }
    }
    else {
      return NextResponse.redirect(new URL("/", req.url));
    }

    console.log("✅ Access allowed");

  } catch (error) {
    console.error("❌ Middleware error:", error);
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }
};

export default clerkMiddleware(clerkHandlerLogic);

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/api/(.*)',
  ],
};


