'use client'

import { useEffect, useState } from "react";

interface Project {
    id: number
    name: string;
    hours: number;
    project: {id: number, location: string}
}

interface Worklog {
    id: number;
    date: string;
    projects: Project[];
    employee: {
        name: string;
    };
    isAbsence: boolean;
}

const AdminDashboard = () => {
    const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth());
    const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
    const [dataWorklog, setDataWorklog] = useState<Worklog[]>([]);
    
    const fetchWorklogs = async () => {
        try {
            const response = await fetch('/api/worklog');
            const data = await response.json();
            setDataWorklog(data);
            console.log(data);
        } catch (error) {
            console.error('Error fetching worklogs:', error);
        }
    };

    useEffect(() => {
        fetchWorklogs();
    }, [dataWorklog])

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
    };

    const calculateUtilization = (worklogs: Worklog[]) => {
        const totalDaysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
        
        // Calculate the number of workdays in the month based on a 5-day workweek
        const totalWorkDaysInMonth = Array.from({ length: totalDaysInMonth }, (_, i) => new Date(selectedYear, selectedMonth, i + 1))
            .filter(date => date.getDay() !== 0 && date.getDay() !== 6).length * 4; // 4 weeks in a month

        // Calculate the total work completed by the user
        const totalWork = worklogs.reduce((acc, day) => {
            if (day.isAbsence) {
                return acc;
            }
            const totalHoursInDay = day.projects.reduce((sum, project) => sum + project.hours, 0);
            if (totalHoursInDay >= 8) {
                return acc + 1; // 8 hours count as 1
            } else if (totalHoursInDay >= 4) {
                return acc + 0.5; // 4 hours count as 0.5
            }
            return acc; // Less than 4 hours count as 0
        }, 0);

        // Calculate the utilization as the ratio of total work to the total number of workdays in the month
        const utilization = (totalWork / totalWorkDaysInMonth) * 100;

        return utilization.toFixed(2);
    };

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const filteredWorklogs = dataWorklog.filter(worklog => {
        const worklogDate = new Date(worklog.date);
        return worklogDate.getMonth() === selectedMonth && worklogDate.getFullYear() === selectedYear;
    });

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <div className="mb-6">
                <h2 className="text-xl font-semibold">Timesheet Worklog Dashboard</h2>
            </div>

            <div className="flex gap-4 mb-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Select Month</label>
                    <select
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(Number(e.target.value))}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {months.map((month, index) => (
                            <option key={index} value={index}>
                                {month}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Select Year</label>
                    <select
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(Number(e.target.value))}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i).map(year => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="flex gap-4 mb-4">
                <div className="overflow-x-auto w-full">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Projects</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hours</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Utilization</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredWorklogs.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                                        No worklogs found
                                    </td>
                                </tr>
                            ):(
                                filteredWorklogs.map((data) => {
                                    const utilization = calculateUtilization([data]);
                                    return (
                                        <tr key={data.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">{data.employee.name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{formatDate(data.date)}</td>
                                            <td className="px-6 py-4">
                                                {data.projects.map((project) => {
                                                    console.log(project);
                                                    return (
                                                        <div key={project.id} className="text-sm">
                                                            {project.project.location}: {project.hours}h
                                                        </div>
                                                    )
                                                })}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {data.projects.reduce((sum, project) => sum + project.hours, 0)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                                data.projects.reduce((sum, project) => sum + project.hours, 0) >= 8
                                                    ? "bg-green-100 text-green-800"
                                                    : "bg-yellow-100 text-yellow-800"
                                                }`}>
                                                {data.projects.reduce((sum, project) => sum + project.hours, 0) >= 8
                                                    ? "Complete"
                                                    : "Incomplete"}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {utilization}%
                                            </td>
                                        </tr>
                                    )
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard