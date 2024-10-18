import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log(prisma);
    if (req.method === 'GET') {
        try {
            const projects = await prisma.project.findMany()
            res.status(200).json(projects)
        } catch (error) {
            console.error('Error fetching projects:', error);
            res.status(500).json({ error: 'Failed to fetch projects' })
        } finally {
            await prisma.$disconnect()
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' })
    }
}