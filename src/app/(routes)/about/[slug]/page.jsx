'use client';
import { useParams } from 'next/navigation';
import Head from 'next/head';
import Image from 'next/image';
import Navbar from '@/src/components/layout/NavbarHome';
import Footer from '@/src/components/layout/Footer';

const memberData = {
    venkatesh: {
        name: 'Mr. Venkatesh Bharti',
        role: 'CEO & Founder',
        img: '/team/founder.jpeg',
        bio: 'Venkatesh Bharti is the visionary behind Xcubit. As CEO and Founder, he leads the company with a passion for innovation and excellence in event technology. His mission is to redefine how people experience and manage events through digital transformation.',
    },
    deepa: {
        name: 'Ms. Deepa Kohli',
        role: 'Marketing Executive',
        img: '/team/deepa.png',
        bio: 'Deepa Kohli drives the marketing initiatives at Xcubit, focusing on building a strong brand presence, fostering partnerships, and executing data-driven campaigns that enhance engagement and visibility.',
    },
    himanshu: {
        name: 'Mr. Himanshu',
        role: 'Business & Development Lead',
        img: '/team/dalal.jpeg',
        bio: 'Himanshu oversees business growth and development strategies at Xcubit. With a focus on partnerships, innovation, and market expansion, he ensures sustainable success for the company and its clients.',
    },
    jai: {
        name: 'Mr. Jai Mishra',
        role: 'Operation Lead',
        img: '/team/jai.jpg',
        bio: 'Jai leads the operational strategies at Xcubit, ensuring smooth coordination across teams, effective event management workflows, and optimized processes for both clients and internal projects.',
    },
    ankit: {
        name: 'Mr. Ankit Singh',
        role: 'Project Manager',
        img: '/team/ankit.jpeg',
        bio: 'Ankit Singh manages project timelines, deliverables, and client coordination at Xcubit. His strong organizational skills and leadership ensure that each project is delivered with precision and excellence.',
    },
    akshobya: {
        name: 'Mr. Akshobya',
        role: 'Sponsor Manager',
        img: '/team/ak.jpeg',
        bio: 'Akshobya specializes in managing sponsor relationships and partnerships. He plays a key role in ensuring mutually beneficial collaborations that contribute to the success of every event.',
    },
};

export default function MemberPage() {
    const { slug } = useParams();
    const member = memberData[slug];

    if (!member)
        return (
            <div className="text-white text-center py-40">Member not found</div>
        );

    return (
        <>
            <Head>
                <title>{member.name} | Xcubit</title>
                <meta
                    name="description"
                    content={`Portfolio of ${member.name}, ${member.role} at Xcubit.`}
                />
            </Head>

            <Navbar />

            <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center pt-32 pb-12">
                <div className="relative w-40 h-40 mb-6 rounded-full overflow-hidden">
                    <Image
                        src={member.img}
                        alt={member.name}
                        fill
                        className="object-cover rounded-full"
                        sizes="160px"
                        priority
                    />
                </div>

                <h1 className="text-3xl font-bold mb-2">{member.name}</h1>
                <p className="text-purple-400 mb-4">{member.role}</p>
                <p className="max-w-2xl text-gray-300 text-center">
                    {member.bio}
                </p>
            </div>

            <Footer />
        </>
    );
}
