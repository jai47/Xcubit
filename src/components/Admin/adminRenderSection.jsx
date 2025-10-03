'use client';
import React, { Suspense } from 'react';
import UsersSection from '@/src/components/Admin/Users/UsersSection';
import EventsSection from '@/src/components/Admin/Events/EventsSection';
import DashboardSection from '@/src/components/Admin/Dashboard/DashboardSection';
import QuerySection from '@/src/components/Admin/Queries/QuerySection';
import InstituteSection from '@/src/components/Admin/Institute/InstituteSection';
import SponsorSection from '@/src/components/Admin/Sponsor/SponsorSection';
import SpeakerSection from '@/src/components/Admin/Speaker/SpeakerSection';
import JudgeSection from '@/src/components/Admin/Judges/JudgeSection';
import ProblemSection from '@/src/components/Admin/Problem/ProblemSection';
import {
    sponsorAdminGET,
    sponsorAdminPOST,
} from '@/src/serverAction/sponsorAction';
import Loading from '@/src/app/(routes)/admin/loading';

import { ErrorBoundary } from 'next/dist/client/components/error-boundary';
import { useSearchParams } from 'next/navigation';
import {
    createNewCollege,
    fetchAllInstitutes,
} from '@/src/serverAction/collegeAction';
import {
    speakerAdminGET,
    speakerAdminPOST,
} from '@/src/serverAction/speakerAction';
import { judgeAdminGET, judgeAdminPOST } from '@/src/serverAction/judgeAction';
import {
    problemStatementDELETE,
    problemStatementGET,
    problemStatementPOST,
} from '@/src/serverAction/problemStatementAction';
import NationalEventSection from './NationalEvent/NationalEventSection';
import {
    nationalEventAdminGET,
    nationalEventAdminPOST,
    nationalEventAdminPUT,
} from '@/src/serverAction/nationalAction';

const AdminRenderSection = ({ events, users, query }) => {
    const searchParams = useSearchParams();
    const querySection = searchParams.get('section') || 'Dashboard';
    const RenderSection = () => {
        switch (querySection) {
            case 'Dashboard':
                return (
                    <DashboardSection
                        events={events}
                        users={users}
                        queries={query}
                    />
                );

            case 'Nationals':
                return (
                    <NationalEventSection
                        nationalEventAdminGET={nationalEventAdminGET}
                        nationalEventAdminPOST={nationalEventAdminPOST}
                        nationalEventAdminPUT={nationalEventAdminPUT}
                    />
                );

            case 'Sponsors':
                return (
                    <SponsorSection
                        events={events}
                        users={users}
                        queries={query}
                        sponsorAdminGET={sponsorAdminGET}
                        sponsorAdminPOST={sponsorAdminPOST}
                    />
                );

            case 'Institutes':
                return (
                    <InstituteSection
                        events={events}
                        users={users}
                        queries={query}
                        fetchAllInstitutes={fetchAllInstitutes}
                        createNewCollege={createNewCollege}
                    />
                );

            case 'Speakers':
                return (
                    <SpeakerSection
                        events={events}
                        users={users}
                        queries={query}
                        speakerAdminGET={speakerAdminGET}
                        speakerAdminPOST={speakerAdminPOST}
                    />
                );

            case 'Judges':
                return (
                    <JudgeSection
                        events={events}
                        users={users}
                        queries={query}
                        judgeAdminGET={judgeAdminGET}
                        judgeAdminPOST={judgeAdminPOST}
                    />
                );

            case 'Problems':
                return (
                    <ProblemSection
                        events={events}
                        users={users}
                        queries={query}
                        problemStatementGET={problemStatementGET}
                        problemStatementPOST={problemStatementPOST}
                        problemStatementDELETE={problemStatementDELETE}
                    />
                );

            case 'Events':
                return <EventsSection events={events} />;

            case 'Users':
                return <UsersSection users={users} />;

            case 'Queries':
                return <QuerySection query={query} />;

            default:
                return (
                    <DashboardSection
                        events={events}
                        users={users}
                        queries={query}
                    />
                );
        }
    };
    return (
        <section className="bg-gray-200 dark:bg-slate-900 flex-1">
            <Suspense fallback={<Loading />}>
                <ErrorBoundary fallback={<div>Not found</div>}>
                    <RenderSection
                        section={querySection}
                        events={events}
                        users={users}
                        query={query}
                    />
                </ErrorBoundary>
            </Suspense>
        </section>
    );
};

export default AdminRenderSection;
