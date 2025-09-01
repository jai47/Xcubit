// 'use client';

// import gsap from 'gsap';
// import { CiLinkedin, CiFacebook, CiInstagram } from 'react-icons/ci';
// import { useRef } from 'react';
// import { useGSAP } from '@gsap/react';
// import Link from 'next/link';
// import HeroTimeRemaining from '../Details/HeroTimeRamaining';

// const HeroSection = () => {
//     const socialIconsRef = useRef(null);
//     const headingRef = useRef(null);
//     const subheading1Ref = useRef(null);
//     const subheading2Ref = useRef(null);

//     useGSAP(
//         () => {
//             const links = socialIconsRef.current?.querySelectorAll('a');

//             gsap.from(links, {
//                 x: -50,
//                 opacity: 0,
//                 duration: 0.8,
//                 delay: 0.5,
//                 ease: 'power4.out',
//                 stagger: 0.2,
//             });

//             gsap.from(subheading1Ref.current, {
//                 y: -50,
//                 opacity: 0,
//                 duration: 1,
//                 delay: 1,
//                 ease: 'power4.out',
//             });
//             gsap.from(subheading2Ref.current, {
//                 y: 50,
//                 opacity: 0,
//                 duration: 1,
//                 delay: 1,
//                 ease: 'power4.out',
//             });

//             gsap.fromTo(
//                 headingRef.current,
//                 { y: 50, opacity: 0 },
//                 { y: 0, opacity: 1, duration: 1, ease: 'power4.out' }
//             );
//         },
//         { scope: [socialIconsRef, headingRef, subheading1Ref] }
//     );

//     return (
//         <section
//             className="relative w-screen h-screen text-background flex flex-col justify-center items-center gap-10 md:flex-row md:justify-between md:gap-0 min-h-screen overflow-hidden dark:text-primary bg-cover bg-center select-none"
//             style={{
//                 backgroundImage: `
//                     linear-gradient(to bottom right, rgba(20, 22, 52), rgba(10, 10, 10), rgba(38, 20, 45, 0.90)), url('/hero.jpg')`,
//                 backgroundPosition: 'center',
//                 backgroundSize: 'cover',
//             }}
//         >
//             {/* 🌌 Aurora Effect Layer */}
//             <div className="absolute inset-0 overflow-hidden pointer-events-none">
//                 <div
//                     className="
//                         absolute -inset-[10px] opacity-60 blur-[100px] will-change-transform
//                         [background-image:repeating-linear-gradient(100deg,rgba(59,130,246,0.15)_10%,rgba(99,102,241,0.25)_20%,rgba(147,197,253,0.2)_30%,rgba(196,181,253,0.25)_40%,rgba(167,139,250,0.2)_50%)]
//                         [background-size:200%_200%]
//                         animate-[aurora_12s_ease-in-out_infinite_alternate]
//                         mix-blend-screen
//                     "
//                 />
//             </div>

//             {/* Left Social Links */}
//             <div
//                 ref={socialIconsRef}
//                 className="fixed left-0 top-0 h-screen w-16 flex-col items-center justify-center hidden md:flex lg:flex z-10"
//             >
//                 <div className="flex flex-col gap-16 items-center justify-center z-10">
//                     <Link
//                         href="https://www.linkedin.com/company/xcubit/"
//                         target="_blank"
//                     >
//                         <CiLinkedin size={20} />
//                     </Link>
//                     <Link href="https://www.linkedin.com/company/xcubit/">
//                         <CiFacebook size={20} />
//                     </Link>
//                     <Link href="https://www.linkedin.com/company/xcubit/">
//                         <CiInstagram size={20} />
//                     </Link>
//                 </div>
//                 <span className="text-sm absolute bottom-28 tracking-[10px] -rotate-90 whitespace-nowrap selection:bg-main selection:text-white">
//                     Follow us on
//                 </span>
//             </div>

//             {/* Hero Content */}
//             <div className="relative z-10 w-full h-full flex flex-col justify-center items-center gap-5">
//                 <h1
//                     ref={headingRef}
//                     className="heading text-9xl font-sans font-medium tracking-wide bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80"
//                 >
//                     Xcubiton
//                 </h1>
//                 <HeroTimeRemaining
//                     data={new Date('2025-12-25T10:00:00')}
//                     className="text-5xl"
//                 />
//                 <h1 className="heading text-9xl font-sans font-medium bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-rose-300">
//                     AI for Good Hackathon
//                 </h1>
//                 <p className="max-w-2xl text-center text-lg">
//                     Crafting exceptional digital experiences through innovative
//                     design and cutting-edge technology.
//                 </p>
//             </div>
//         </section>
//     );
// };

// export default HeroSection;
