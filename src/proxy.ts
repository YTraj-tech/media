


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
 
 
 

  return NextResponse.next()
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|png|jpg|jpeg|gif|svg|woff2?|ico)).*)',
    '/api/(.*)',
  ],
};


