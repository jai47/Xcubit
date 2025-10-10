import { auth } from '@/src/auth';
import RegisterForm from '@/src/components/Registration/RegistrationForm';
import { getEventBySlug } from '@/src/serverAction/eventAction';
import { getUserFromDB } from '@/src/serverAction/userAction';
import { redirect } from 'next/navigation';
import NotFound from '../../not-found';
import { checkAlreadyInTeam, getTeamById } from '@/src/serverAction/teamAction';

export default async function Page({ searchParams }) {
    const Params = await searchParams;
    const session = await auth();
    if (!session) redirect('/login');

    // ✅ Get invite code if exists
    const InviteCode = Params.team || '';

    let event = null;
    let teamFromInvite = null;

    // ✅ If Invite link present, fetch team + event from that team
    if (InviteCode) {
        const teamRes = await getTeamById(InviteCode);
        if (!teamRes.success) {
            return <NotFound />; // invalid or deleted team
        }
        teamFromInvite = teamRes.team;
        event = teamRes.event;
    } else {
        // ✅ Otherwise use event slug (normal registration)
        const eventSlug = decodeURIComponent(Params.event || '');
        event = await getEventBySlug(eventSlug);
        if (!event) {
            return <NotFound />;
        }
    }

    const user = await getUserFromDB(session.user.email);
    if (!user) redirect('/login');

    // ✅ Check if user already has a team in this event
    let team = await checkAlreadyInTeam(event._id, user._id);
    team = JSON.parse(JSON.stringify(team));

    const safeEvent = event ? JSON.parse(JSON.stringify(event)) : null;
    const safeTeam = team ? JSON.parse(JSON.stringify(team)) : null;
    const safeTeamFromInvite = teamFromInvite
        ? JSON.parse(JSON.stringify(teamFromInvite))
        : null;
    const safeUser = user ? JSON.parse(JSON.stringify(user)) : null;

    return (
        <RegisterForm
            event={safeEvent}
            user={safeUser}
            team={safeTeam}
            InviteCode={InviteCode}
            teamFromInvite={safeTeamFromInvite}
        />
    );
}
