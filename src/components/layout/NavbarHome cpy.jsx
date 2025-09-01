// 'use client';
// import { useEffect, useState, useRef } from 'react';
// import Link from 'next/link';
// import Image from 'next/image';
// import logoImage from '../../../public/logo/logo.png';
// import { useSession } from 'next-auth/react';
// import { useGSAP } from '@gsap/react';
// import gsap from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';

// gsap.registerPlugin(ScrollTrigger);

// const Navbar = () => {
//     const { data: session } = useSession();
//     const user = session?.user;
//     const [isOpen, setIsOpen] = useState(false);
//     const tl = useRef(null);
//     const logoImageDiv = useRef(null);
//     const logoImageRef = useRef(null);

//     useGSAP(
//         () => {
//             if (logoImageDiv.current && logoImageRef.current) {
//                 gsap.set(logoImageRef.current, { scale: 1.2 });

//                 gsap.timeline({
//                     scrollTrigger: {
//                         trigger: logoImageDiv.current,
//                         start: 'top top',
//                         end: '+=200',
//                         scrub: true,
//                     },
//                 })
//                     .to(logoImageDiv.current, {
//                         padding: '0.5rem',
//                     })
//                     .to(
//                         logoImageRef.current,
//                         {
//                             scale: 1,
//                             filter: window.matchMedia(
//                                 '(prefers-color-scheme: dark)'
//                             ).matches
//                                 ? 'none' // No inversion in dark mode
//                                 : 'invert(1)', // Invert in light mode
//                         },
//                         '<' // Ensures this animation runs simultaneously
//                     );
//             }
//         },
//         { scope: logoImageDiv }
//     );

//     useGSAP(
//         () => {
//             gsap.set('.links', { opacity: 0, x: 50 });

//             tl.current = gsap
//                 .timeline({ paused: true })
//                 .to('#menu', {
//                     duration: 1,
//                     clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
//                     ease: 'power4.out',
//                 })
//                 .from('.close', {
//                     opacity: 0,
//                     x: -50,
//                     duration: 0.3,
//                     ease: 'power4.out',
//                 })
//                 .to(
//                     '.links',
//                     {
//                         opacity: 1,
//                         x: 0,
//                         stagger: 0.1,
//                         duration: 0.3,
//                         ease: 'power4.out',
//                     },
//                     '-=0.5'
//                 );
//         },
//         { scope: tl }
//     );

//     useEffect(() => {
//         if (isOpen) {
//             tl.current.play();
//         } else {
//             tl.current.reverse();
//         }
//     }, [isOpen]);

//     const handleMouseEnter = (e) => {
//         gsap.to(e.currentTarget, {
//             x: 100,
//             scale: 1.1,
//             duration: 0.75,
//             ease: 'power4.out',
//         });
//     };

//     const handleMouseLeave = (e) => {
//         gsap.to(e.currentTarget, {
//             x: 0,
//             scale: 1,
//             duration: 0.75,
//             ease: 'power4.out',
//         });
//     };

//     return (
//         <nav
//             ref={tl}
//             className="w-svw text-black px-6 py-3 fixed z-20 top-0 start-0 dark:bg-background"
//         >
//             <div className="container mx-auto flex items-center justify-end">
//                 {/* Left: Logo */}
//                 <Link href="/">
//                     <div
//                         ref={logoImageDiv}
//                         className="absolute top-0 left-0 flex items-center justify-center p-6"
//                     >
//                         <Image
//                             ref={logoImageRef}
//                             className="invert dark:invert-0"
//                             src={logoImage}
//                             alt="Logo"
//                             height={45}
//                             priority
//                         />
//                     </div>
//                 </Link>
//                 <div
//                     id="menu"
//                     className={`h-screen w-screen bg-main text-black fixed top-0 right-0 flex flex-col pl-20 justify-center space-y-16`}
//                     style={{
//                         clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)',
//                     }}
//                 >
//                     <button
//                         className="close absolute top-6 left-6"
//                         onClick={() => setIsOpen(!isOpen)}
//                     >
//                         <p className="text-2xl text-white">&#x2715;</p>
//                     </button>
//                     <Link
//                         href="/"
//                         className="text-4xl text-white links md:text-6xl"
//                         style={{ fontFamily: 'Times New Roman' }}
//                         onMouseEnter={handleMouseEnter}
//                         onMouseLeave={handleMouseLeave}
//                     >
//                         <span>Home</span>
//                     </Link>
//                     <Link
//                         href="/events"
//                         className="text-4xl text-white links md:text-6xl"
//                         style={{ fontFamily: 'Times New Roman' }}
//                         onMouseEnter={handleMouseEnter}
//                         onMouseLeave={handleMouseLeave}
//                     >
//                         <span>Events</span>
//                     </Link>
//                     {!user ? (
//                         <Link
//                             href="/login"
//                             className="text-4xl text-white links md:text-6xl"
//                             style={{ fontFamily: 'Times New Roman' }}
//                             onMouseEnter={handleMouseEnter}
//                             onMouseLeave={handleMouseLeave}
//                         >
//                             <span>Signup</span>
//                         </Link>
//                     ) : (
//                         <Link
//                             href={{
//                                 pathname: '/dashboard',
//                                 query: { section: 'My Tickets' },
//                             }}
//                             className="text-4xl text-white links md:text-6xl"
//                             style={{ fontFamily: 'Times New Roman' }}
//                             onMouseEnter={handleMouseEnter}
//                             onMouseLeave={handleMouseLeave}
//                         >
//                             <span>Tickets</span>
//                         </Link>
//                     )}

//                     <Link
//                         href="/about"
//                         className="text-4xl text-white links md:text-6xl"
//                         style={{ fontFamily: 'Times New Roman' }}
//                         onMouseEnter={handleMouseEnter}
//                         onMouseLeave={handleMouseLeave}
//                     >
//                         <span>About Us</span>
//                     </Link>
//                     <Link
//                         href="/contact"
//                         className="text-4xl text-white links md:text-6xl"
//                         style={{ fontFamily: 'Times New Roman' }}
//                         onMouseEnter={handleMouseEnter}
//                         onMouseLeave={handleMouseLeave}
//                     >
//                         <span>Support</span>
//                     </Link>
//                     <div>
//                         <p className="mt-4 md:mt-0 text-xs md:text-sm">
//                             ©️ 2024 Xcubit. All rights reserved.
//                         </p>
//                     </div>
//                 </div>

//                 {/* Center: Navbar Links (Hidden on Small Screens) */}
//                 <div className="text-sm flex items-center justify-end space-x-8">
//                     <button
//                         aria-label="close"
//                         onClick={() => setIsOpen(!isOpen)}
//                     >
//                         <svg
//                             fill="black"
//                             stroke="black"
//                             strokeWidth="2"
//                             viewBox="0 0 24 24"
//                             className="w-6 h-6 fill-black stroke-black dark:fill-white dark:stroke-white"
//                         >
//                             <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 d={
//                                     isOpen
//                                         ? 'M6 18L18 6M6 6l12 12'
//                                         : 'M4 6h16M4 12h16m-7 6h7'
//                                 }
//                             />
//                         </svg>
//                     </button>
//                     {/* Right: Login & Signup */}
//                     <div className="hidden items-center space-x-4 md:flex">
//                         {!user ? (
//                             <>
//                                 <Link
//                                     href="/login"
//                                     className="px-6 py-2 bg-main border text-white uppercase border-black rounded-full hover:bg-white hover:text-black transition duration-200"
//                                 >
//                                     Login
//                                 </Link>
//                             </>
//                         ) : (
//                             <Link
//                                 href={{
//                                     pathname: '/dashboard',
//                                     query: {
//                                         section: 'Profile',
//                                     },
//                                 }}
//                                 className="px-6 py-2 border text-white bg-main uppercase border-black rounded-full hover:bg-white hover:text-black transition duration-200"
//                             >
//                                 <span>{user.name}</span>
//                             </Link>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </nav>
//     );
// };

// export default Navbar;
