'use client'

import { useEffect, useState } from "react";

interface Project {
    projectId: number
    hours: string
}

interface ListProjects {
    id: number
    location: string
}

interface ListAbsences {
    id: number
    absenceType: string
    absenceValue: string
}

interface ListEmployees {
    id: number
    name: string
    age: number
}

const WorklogForm = () => {
    const [date, setDate] = useState<string>('');
    const [projects, setProjects] = useState<Project[]>([]);
    const [isAbsence, setIsAbsence] = useState<boolean>(false);
    const [absenceType, setAbsenceType] = useState<string>('');
    const [employee, setEmployee] = useState<string>('');

    const [listProjects, setListProjects] = useState<ListProjects[]>([])
    const [listAbsences, setListAbsences] = useState<ListAbsences[]>([])
    const [listEmployees, setListEmployees] = useState<ListEmployees[]>([])

    const fetchProjects = async () => {
        try {
            const response = await fetch('/api/projects')
            const data = await response.json()

            setListProjects(data)
        } catch (error) {
            console.log(error);
        }
    }

    const fetchAbsences = async () => {
        try {
            const response = await fetch('/api/absences')
            const data = await response.json()

            setListAbsences(data)
        } catch (error) {
            console.log(error);
        }
    }

    const fetchEmployees = async () => {
        try {
            const response = await fetch('/api/employees')
            const data = await response.json()

            setListEmployees(data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchProjects()
    }, [])

    useEffect(() => {
        fetchAbsences()
    }, [])

    useEffect(() => {
        fetchEmployees()
    }, [])

    const handleAddProject = () => {
        setProjects([...projects, { projectId: 0, hours: '' }]);
    };

    const handleRemoveProject = (index: number) => {
        const newProjects = [...projects];
        newProjects.splice(index, 1);
        setProjects(newProjects);
    };

    const handleProjectChange = (index: number, field: string, value: string) => {
        const newProjects = [...projects];
        if (field === 'projectId') {
            newProjects[index].projectId = Number(value);
        } else if (field === 'hours') {
            newProjects[index].hours = value;
        }
        setProjects(newProjects);
    };

    const calculateTotalHours = () => {
        return projects.reduce((sum, project) => sum + Number(project.hours || 0), 0);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = {
            employeeId: employee,
            date,
            isAbsence,
            absenceType: isAbsence ? absenceType : '',
            projects: isAbsence ? [] : projects,
        };
        console.log('Form submitted:', formData);

        try {
            const response = await fetch('/api/worklog', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
    
            if (response.ok) {
                console.log('Form submitted successfully');
            } else if (response.status === 400) {
                alert('Total hours for project cannot exceed 8 hours.');
            } else {
                console.error('Failed to submit form');
            }
        } catch (error) {
            console.error('Failed to submit form', error);
        }
    };

    return (
        <div className="max-w-full mb-5 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-6">Add Worklog Entry</h2>

            <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Employee Name
                    </label>
                    <select
                        value={employee}
                        onChange={(e) => setEmployee(e.target.value)}
                        required
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Select employee</option>
                        {listEmployees.map((e) => (
                            <option key={e.id} value={e.id}>
                                {e.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Date
                    </label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        id="isAbsence"
                        checked={isAbsence}
                        onChange={(e) => setIsAbsence(e.target.checked)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor="isAbsence" className="text-sm font-medium text-gray-700">
                        Mark as absence
                    </label>
                </div>

                {isAbsence && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Absence Type
                        </label>
                        <select
                            value={absenceType}
                            onChange={(e) => setAbsenceType(e.target.value)}
                            required
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select type</option>
                            {listAbsences.map((a) => (
                                <option key={a.id} value={a.absenceValue}>
                                    {a.absenceType}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                {!isAbsence && (
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-medium">Projects</h3>
                            <div className="text-sm text-gray-500">
                                Total Hours: {calculateTotalHours()}/8
                            </div>
                        </div>

                        {projects.map((project, index) => (
                            <div key={index} className="flex gap-4 items-start">
                                <div className="flex-1">
                                    <select
                                        value={project.projectId}
                                        onChange={(e) => handleProjectChange(index, 'projectId', e.target.value)}
                                        required
                                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="">Select project</option>
                                        {listProjects.map((p) => (
                                            <option key={p.id} value={p.id}>
                                                {p.location}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="w-32">
                                <input
                                    type="number"
                                    value={project.hours}
                                    onChange={(e) => handleProjectChange(index, 'hours', e.target.value)}
                                    min="0"
                                    max="8"
                                    step="0.5"
                                    required
                                    placeholder="Hours"
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                </div>

                                {projects.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveProject(index)}
                                        className="px-3 py-2 text-red-600 hover:text-red-800"
                                    >
                                        Remove
                                    </button>
                                )}
                            </div>
                        ))}

                        {calculateTotalHours() < 8 && (
                            <button
                                type="button"
                                onClick={handleAddProject}
                                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                            >
                                + Add Project
                            </button>
                        )}

                        {calculateTotalHours() > 8 && (
                            <p className="text-red-600 text-sm">
                                Total hours cannot exceed 8 hours per day
                            </p>
                        )}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={!isAbsence && (calculateTotalHours() > 8 || calculateTotalHours() === 0)}
                    className={`w-full py-2 px-4 rounded-md text-white font-medium
                        ${!isAbsence && (calculateTotalHours() > 8 || calculateTotalHours() === 0)
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                >
                    Submit Worklog
                </button>
            </form>
        </div>
    )
}

export default WorklogForm