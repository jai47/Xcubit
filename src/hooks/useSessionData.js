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

// //code for cache

// // hooks/useSessionData.js
// import { cache, useEffect, useState } from 'react';
// import { getSession } from 'next-auth/react';

// const useSessionData = cache(async () => {
//     const [session, setSession] = useState(null);

//     useEffect(() => {
//         const fetchSession = async () => {
//             const sessionData = await getSession();
//             setSession(sessionData);
//         };

//         fetchSession();
//     }, []);

//     return session;
// });

// export default useSessionData;
