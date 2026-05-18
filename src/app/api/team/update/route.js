import { updateTeam } from '@/src/serverAction/teamAction';
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        const { teamId, submission } = await req.json();

        const result = await updateTeam(teamId, { submission });
        return NextResponse.json(result);
    } catch (err) {
        console.error('Team update API error:', err);
        return NextResponse.json(
            { success: false, message: 'Server error' },
            { status: 500 }
        );
    }
}
