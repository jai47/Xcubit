// hooks/useEvent.js

//hook to fetch event details in url
import { useEffect, useState } from 'react';
import { redirect, useSearchParams } from 'next/navigation';

const useEvent = () => {
    const searchParams = useSearchParams();
    const eventQuery = searchParams.get('event');
    const [event, setEvent] = useState(null);

    useEffect(() => {
        const fetchEvent = async () => {
            if (!eventQuery) {
                redirect('/events');
            }
            try {
                const response = await fetch('/api/events/', {
                    cache: 'no-store',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ slug: eventQuery }),
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch event');
                }
                const fetchedEvent = await response.json();
                setEvent(fetchedEvent.details);
            } catch (error) {
                console.error('Error fetching event:', error);
            }
        };

        fetchEvent();
    }, [eventQuery]);

    return event;
};

export default useEvent;
