import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const absences = await prisma.absence.findMany()
            res.status(200).json(absences)
        } catch (error) {
            console.error('Error fetching absences:', error);
            res.status(500).json({ error: 'Failed to fetch absences' })
        } finally {
            await prisma.$disconnect()
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' })
    }
}