import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";


// const isPublicRoute = createRouteMatcher(['api/:path*']);

export default clerkMiddleware();


export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};


// (auth,request)=>{
//   // if(!isPublicRoute(request)) {
//   //   auth().protect();
//   // }
// }