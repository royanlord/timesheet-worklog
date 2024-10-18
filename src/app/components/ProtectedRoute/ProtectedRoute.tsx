'use client'

import { useSession, signIn } from 'next-auth/react';
import { useEffect } from 'react';

import { ReactNode } from 'react';

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
    const { data: session, status } = useSession();

    useEffect(() => {
        if (status === 'loading') return; 
        if (!session) signIn();
    }, [session, status]);

    if (status === 'loading' || !session) {
        return <div>Loading...</div>;
    }

    return children;
};

export default ProtectedRoute;