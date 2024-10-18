'use client'

import { PrismaClient } from "@prisma/client"
import { useEffect, useState } from "react"
import AdminDashboard from "../components/AdminDashboard/AdminDashboard"
import WorklogForm from "../components/WorklogForm/WorklogForm"
import ButtonLogout from "../components/ButtonLogout/ButtonLogout"

interface Employees {
    id: number
    name: string
    age: number
}

const TimeSheet = () => {
    const prisma = new PrismaClient()
    const [showForm, setShowForm] = useState<boolean>(false);

    const [employees, setEmployees] = useState<Employees[]>([])

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await fetch('/api/employees')
                const data = await response.json()
                setEmployees(data)
            } catch (error) {
                console.log(error);
            }
        }

        fetchEmployees()
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
    }

    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Timesheet Management</h1>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                    {showForm ? 'Close Form' : 'Add New Entry'}
                </button>
                </div>

                {
                    showForm && 
                    <WorklogForm />
                }
                <AdminDashboard />
                <ButtonLogout />
            </div>

        </div>
    )
}

export default TimeSheet