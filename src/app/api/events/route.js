import { getEventBySlug, getEvents } from '@/src/serverAction/eventAction';
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        const { slug } = await req.json();

        // Call DB/service
        const eventDetails = await getEventBySlug(slug);

        if (!eventDetails) {
            return NextResponse.json(
                { error: `Event not found.` },
                { status: 404 }
            );
        }

        return NextResponse.json({
            details: JSON.parse(JSON.stringify(eventDetails)),
        });
    } catch (error) {
        console.error('Error fetching event:', error);
        return NextResponse.json(
            { error: 'Failed to fetch event' },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        const events = await getEvents();
        return NextResponse.json({
            events: JSON.parse(JSON.stringify(events)),
        });
    } catch (error) {
        console.error('Error fetching events:', error);
        return NextResponse.status(500).json({
            error: 'Failed to fetch events',
        });
    }
}
