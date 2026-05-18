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
    const { success, data } = await fetchInstituteByAdminEmail(
        session?.user?.email
    );

    if (!success) {
        return redirect('/'); // immediately exit
    }
    const college = JSON.parse(JSON.stringify(data));

    if (!college?.verified) {
        console.log('College admin email yet not verified or approved');
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
            <div className="flex flex-1 overflow-hidden bg-neutral-900">
                {college.approval && college.contract && (
                    <>
                        <SideNavbar />
                        <InstituteSectionRenderer college={college} />
                    </>
                )}
                {!college?.contract ? (
                    <ContractModal
                        email={session.user.email}
                        updateCollegeContract={updateCollegeContract}
                    />
                ) : (
                    !college.approval && (
                        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
                            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[1]">
                                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md">
                                    <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
                                        Under review
                                    </h2>
                                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
                                        Your college is currently under review
                                        and has not yet been approved by the
                                        organizers of this event. We appreciate
                                        your patience.
                                    </p>
                                    <div className="w-full flex item-end justify-end">
                                        <Link
                                            href="/" // replace with your number
                                            className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-lg 
                               bg-green-600 text-white text-sm font-medium shadow-md 
                               hover:bg-green-700 transition-colors"
                                        >
                                            Go to home screen
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                )}
            </div>
        </div>
    );
};

export default InstitutePage;
