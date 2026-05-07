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


import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
])

const isWebhookRoute = createRouteMatcher([
  "/api/webhooks(.*)"
])

export default clerkMiddleware(async (auth, req) => {

  // ✅ allow webhooks WITHOUT auth
  if (isWebhookRoute(req)) {
    return NextResponse.next()
  }

  const { userId } = await auth()

  if (!userId) {
    if (isPublicRoute(req)) {
      return NextResponse.next()
    }

    return NextResponse.redirect(new URL("/sign-in", req.url))
  }

  if (isPublicRoute(req)) {
    return NextResponse.redirect(new URL("/dashboard", req.url))
  }

  return NextResponse.next()
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|png|jpg|jpeg|gif|svg|woff2?|ico)).*)',
    '/api/(.*)',
  ],
};


