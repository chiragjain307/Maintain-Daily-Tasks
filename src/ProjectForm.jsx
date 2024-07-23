import React, { useState } from 'react';

const ProjectForm = () => {
    const [formData, setFormData] = useState({
        project: '',
        tasks: '',
        startDate: '',
        exptEndDate: '',
        estdHours: '',
        status: '',
        remarks: '',
    });
    console.log(formData)


    const handleChange = (e) => {
        console.log(e.target)
        const { name, value } = e.target;

        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Data Submitted:', formData);
    };

    return (
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-md shadow-md">
            <h2 className="text-2xl font-semibold mb-6">Project Form</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
                {[
                    { label: 'Project', name: 'project', type: 'text' },
                    { label: 'Tasks', name: 'tasks', type: 'text' },
                    { label: 'Start Date', name: 'startDate', type: 'date' },
                    { label: 'Expt. End Date', name: 'exptEndDate', type: 'date' },
                    { label: 'Estd. Hours', name: 'estdHours', type: 'number' },
                    { label: 'Status', name: 'status', type: 'text' },
                    { label: 'Remarks', name: 'remarks', type: 'text' },
                ].map(({ label, name, type }) => (
                    <div key={name}>
                        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-2">
                            {label}
                        </label>
                        <input
                            type={type}
                            name={name}
                            id={name}
                            value={formData[name]}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                ))}
                <button
                    type="submit"
                    className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default ProjectForm;
