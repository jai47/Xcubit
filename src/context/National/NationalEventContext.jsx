'use client';
import { createContext, useContext, useState } from 'react';

const NationalEventContext = createContext(null);

export function NationalEventProvider({ children, initialEvent }) {
    const [event, setEvent] = useState(initialEvent); // ✅ start with server-fetched data
    return (
        <NationalEventContext.Provider value={event}>
            {children}
        </NationalEventContext.Provider>
    );
}

export function useNationalEvent() {
    return useContext(NationalEventContext);
}
