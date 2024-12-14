export { auth as middleware } from '@/auth';

// import { NextResponse } from 'next/server';
// import { getToken } from 'next-auth/jwt';

// export async function middleware(req) {
//     const secret = process.env.AUTH_SECRET;
//     const session = await getToken({ req, secret });
//     if (session && req.nextUrl.pathname.startsWith('/signin')) {
//         return NextResponse.rewrite(new URL('/', req.url));
//     }
//     if (
//         session?.role !== 'admin' &&
//         req.nextUrl.pathname.startsWith('/admin')
//     ) {
//         // Redirect to login page if no session exists
//         return NextResponse.redirect(new URL('/', req.url));
//     }

//     if (
//         !session &&
//         (req.nextUrl.pathname.startsWith('/dashboard') ||
//             req.nextUrl.pathname.startsWith('/register'))
//     ) {
//         return NextResponse.redirect(new URL('/login', req.url));
//     }

//     // If session exists, continue to the requested page
//     return NextResponse.next();
// }

// // See "Matching Paths" below to learn more
// export const config = {
//     matcher: [
//         '/admin/:path*',
//         '/signin/:path*',
//         '/login/:path*',
//         '/dashboard/:path*',
//         '/api/getUser/:path*',
//         '/register/:path*',
//     ],
// };
