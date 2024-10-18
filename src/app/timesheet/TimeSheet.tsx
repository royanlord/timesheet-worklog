'use client'

import { useState } from "react"
import AdminDashboard from "../components/AdminDashboard/AdminDashboard"
import WorklogForm from "../components/WorklogForm/WorklogForm"
import ButtonLogout from "../components/ButtonLogout/ButtonLogout"

const TimeSheet = () => {
    const [showForm, setShowForm] = useState<boolean>(false);

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