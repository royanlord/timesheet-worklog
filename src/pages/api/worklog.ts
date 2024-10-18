import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { employeeId, date, isAbsence, absenceType, projects } = req.body

        try {
            for (const project of projects) {
                const existingWorklogs = await prisma.worklog.findMany({
                    where: {
                        date: new Date(date),
                        projects: {
                            some: {
                                projectId: project.projectId,
                            },
                        },
                    },
                    include: {
                        projects: true,
                    },
                })

                const totalExistingHours = existingWorklogs.reduce((sum, worklog) => {
                    return sum + worklog.projects.reduce((projectSum, p) => {
                        return p.projectId === project.projectId ? projectSum + p.hours : projectSum
                    }, 0)
                }, 0)

                const newTotalHours = totalExistingHours + Number(project.hours)
                if (newTotalHours > 8) {
                    return res.status(400).json({ error: `Total hours for project ${project.projectId} on ${date} cannot exceed 8 hours.` })
                }
            }

            const worklog = await prisma.worklog.create({
                data: {
                    date: new Date(date),
                    isAbsence,
                    absenceType,
                    employeeId: Number(employeeId),
                    projects: {
                        create: projects.map((project: { projectId: number, hours: string }) => ({
                            projectId: project.projectId,
                            hours: Number(project.hours),
                        })),
                    },
                },
            })
            res.status(201).json(worklog)
        } catch (error) {
            console.error(error)
            res.status(500).json({ error: 'Failed to save worklog' })
        } finally {
            await prisma.$disconnect()
        }
    } else if (req.method === "GET") {
        try {
            const worklogs = await prisma.worklog.findMany({
                include: {
                    projects: {
                        include: {
                            project: true,
                        },
                    },
                    employee: true,
                },
            })
            res.status(200).json(worklogs)
        } catch (error) {
            console.error('Error fetching worklogs:', error)
            res.status(500).json({ error: 'Failed to fetch worklogs' })
        } finally {
            await prisma.$disconnect()
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' })
    }
}