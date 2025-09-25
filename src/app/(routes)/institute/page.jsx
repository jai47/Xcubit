import Link from 'next/link';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { HiOutlineMenu } from 'react-icons/hi';

import SideNavbar from '@/src/components/Institute/SideNavbar';
import InstituteSectionRenderer from '@/src/components/Institute/InstituteSectionRenderer';
import { auth } from '@/src/auth';
import {
    fetchInstituteByAdminEmail,
    updateCollegeContract,
} from '@/src/serverAction/collegeAction';
import ContractModal from '@/src/components/Institute/contractModal';

const InstitutePage = async () => {
    // Authenticate user
    const session = await auth();
    if (!session?.user?.email) {
        return redirect('/login');
    }

    // Fetch institute data
    let college;
    try {
        const { success, data } = await fetchInstituteByAdminEmail(
            session.user.email
        );
        if (!success) {
            console.error('Failed to fetch college data');
            return redirect('/');
        }
        college = JSON.parse(JSON.stringify(data));
    } catch (error) {
        console.error('Error fetching college data:', error);
        return redirect('/');
    }

    // Render page
    return (
        <div className="flex flex-col h-screen">
            {/* Navbar */}
            <nav className="w-full bg-gray-200 dark:bg-gray-800 flex justify-between items-center p-4 border-b border-gray-300">
                <div className="flex items-center gap-2">
                    <button className="md:hidden text-gray-600 dark:text-white">
                        <HiOutlineMenu size={24} />
                    </button>
                    <Link href="/" className="flex items-center gap-2">
                        <Image
                            src="/logo/logo.png"
                            alt="logo"
                            width={20}
                            height={20}
                            className="invert dark:invert-0"
                        />
                        <span className="text-background dark:text-white font-bold">
                            XCUBIT
                        </span>
                    </Link>
                </div>
                <div className="hidden md:flex items-center gap-4">
                    <Link
                        href="/institute"
                        className="text-gray-600 dark:text-white hover:text-gray-800 dark:hover:text-primary"
                    >
                        Institute
                    </Link>
                    <Link
                        href="/"
                        className="text-gray-600 dark:text-white hover:text-gray-800 dark:hover:text-primary"
                    >
                        Home
                    </Link>
                </div>
            </nav>

            {/* Main content area */}
            <div className="flex flex-1 overflow-hidden">
                <SideNavbar />
                <InstituteSectionRenderer college={college} />
                {!college?.contract && (
                    <ContractModal
                        email={session.user.email}
                        updateCollegeContract={updateCollegeContract}
                    />
                )}
            </div>
        </div>
    );
};

export default InstitutePage;
