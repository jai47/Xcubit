import { getEventByName, getEvents } from '@/src/serverAction/eventAction';
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        const { event } = await req?.json();
        const eventDetails = await getEventByName(event);
        if (!event) {
            return NextResponse.status(404).json({
                error: `Event with name "${event}" not found.`,
            });
        }
        return NextResponse.json({
            details: JSON.parse(JSON.stringify(eventDetails)),
        });
    } catch (error) {
        console.error('Error fetching event:', error);
        return NextResponse.status(500).json({
            error: 'Failed to fetch event',
        });
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
