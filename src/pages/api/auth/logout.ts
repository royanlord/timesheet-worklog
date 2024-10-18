import { NextApiRequest, NextApiResponse } from 'next';
import { getSession, signOut } from 'next-auth/react';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getSession({ req });
    if (session) {
        await signOut({ redirect: false, callbackUrl: '/' });
        res.status(200).json({ message: 'Logged out' });
    } else {
        res.status(401).json({ message: 'Not authenticated' });
    }
};