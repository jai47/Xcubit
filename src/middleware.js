// // export { auth as middleware } from '@/src/auth';

// // import { getToken } from 'next-auth/jwt';
// import { NextResponse } from 'next/server';

// export async function middleware(req) {
//     // const secret = process.env.AUTH_SECRET;
//     // const session = await getToken({ req, secret });
//     // const url = req.nextUrl.clone();
//     // const host = req.headers.get('host') || '';
//     // const baseUrl = new URL(process.env.NEXT_PUBLIC_BASE_URL); // http://localhost:3000
//     // const baseDomain = baseUrl.host; // localhost:3000

//     // // extract subdomain
//     // const subdomain = host.split('.')[0];
//     // console.log(url);

//     // only rewrite if subdomain is NOT the base domain or 'localhost'
//     // if (host !== baseDomain && subdomain !== 'localhost') {
//     //     url.pathname = `/events/${subdomain}`;
//     //     return NextResponse.rewrite(url);
//     // }

//     // if (subdomain && host !== baseDomain) {
//     //     if (url.pathname === '/' || url.pathname.startsWith('/events')) {
//     //         url.pathname = `/events/${subdomain}${url.pathname.replace(
//     //             /^\/events\/[^/]+/,
//     //             ''
//     //         )}`;
//     //         return NextResponse.rewrite(url);
//     //     }
//     // }

//     // if (host === baseDomain && url.pathname.startsWith('/events/')) {
//     //     const slug = url.pathname.split('/')[2]; // events/[slug]
//     //     if (slug) {
//     //         // 👇 Option A: Rewrite to subdomain
//     //         return NextResponse.redirect(
//     //             `${url.protocol}//${slug}.${baseDomain}${url.pathname.replace(
//     //                 `/events/${slug}`,
//     //                 ''
//     //             )}`
//     //         );

//     //         // 👇 Option B: If you only want it to stay as-is, just skip rewriting
//     //         // return NextResponse.next();
//     //     }
//     // }

//     return NextResponse.next();
// }

// // export const config = {
// //     matcher: ['/((?!api|_next|.*\\..*).*)'], // exclude next internals
// // };

// // // See "Matching Paths" below to learn more
// // export const config = {
// //     matcher: [
// //         '/:path*',
// //         '/admin/:path*',
// //         '/signin/:path*',
// //         '/login/:path*',
// //         '/dashboard/:path*',
// //         '/api/getUser/:path*',
// //         '/register/:path*',
// //     ],
// // };

// // // const res = await fetch;
// // // if (session && req.nextUrl.pathname.startsWith('/signin')) {
// // //     return NextResponse.rewrite(new URL('/', req.url));
// // // }
// // // if (
// // //     session?.role !== 'admin' &&
// // //     req.nextUrl.pathname.startsWith('/admin')
// // // ) {
// // //     // Redirect to login page if no session exists
// // //     return NextResponse.redirect(new URL('/', req.url));
// // // }

// // // if (
// // //     !session &&
// // //     (req.nextUrl.pathname.startsWith('/dashboard') ||
// // //         req.nextUrl.pathname.startsWith('/register'))
// // // ) {
// // //     return NextResponse.redirect(new URL('/login', req.url));
// // // }

// middleware.ts
import { NextResponse } from 'next/server';
// import { getToken } from 'next-auth/jwt';

export async function middleware(req) {
    // const token = await getToken({ req, secret: process.env.AUTH_SECRET });

    // // Protect /admin
    // if (req.nextUrl.pathname.startsWith('/admin')) {
    //     if (!token || token.role !== 'admin') {
    //         return NextResponse.redirect(new URL('/api/auth/signin', req.url));
    //     }
    // }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next|.*\\..*).*)'], // exclude next internals
};
