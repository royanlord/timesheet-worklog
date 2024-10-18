import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const employees = await prisma.employee.findMany()
            res.status(200).json(employees)
        } catch (error) {
            console.error('Error fetching employees:', error);
            res.status(500).json({ error: 'Failed to fetch employees' })
        } finally {
            await prisma.$disconnect()
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' })
    }
}