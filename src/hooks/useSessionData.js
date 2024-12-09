// hooks/useSessionData.js
import { useEffect, useState } from 'react';
import { getSession } from 'next-auth/react';

const useSessionData = () => {
    const [session, setSession] = useState(null);

    useEffect(() => {
        const fetchSession = async () => {
            const sessionData = await getSession();
            setSession(sessionData);
        };

        fetchSession();
    }, []);

    return session;
};

export default useSessionData;
