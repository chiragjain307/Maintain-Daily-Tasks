import React, { useState, useEffect } from 'react';

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
  const [scriptURL, setScriptURL] = useState('');

  useEffect(() => {
    const storedScriptURL = localStorage.getItem('scriptURL');
    if (storedScriptURL) {
      setScriptURL(storedScriptURL);
    } else {
      const userScriptURL = prompt('Please enter your script URL:');
      if (userScriptURL) {
        localStorage.setItem('scriptURL', userScriptURL);
        setScriptURL(userScriptURL);
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);
    setFormData({
      project: '',
      tasks: '',
      startDate: '',
      exptEndDate: '',
      estdHours: '',
      status: '',
      remarks: '',
    });

    const form = e.target;

    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
      .then(response => alert("Thank you! Your form is submitted successfully."))
      .then(() => { window.location.reload(); })
      .catch(error => console.error('Error!', error.message));
  };

  const handleChangeScriptURL = () => {
    const newScriptURL = prompt('Please enter your new script URL:', scriptURL);
    if (newScriptURL) {
      localStorage.setItem('scriptURL', newScriptURL);
      setScriptURL(newScriptURL);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-md shadow-md">
      <button
        onClick={handleChangeScriptURL}
        className="absolute top-4 right-4 bg-gray-200 p-2 rounded-md text-sm"
      >
        Change Script URL
      </button>
      <h2 className="text-2xl font-semibold mb-6">Project Form</h2>
      <form onSubmit={handleSubmit} method='POST' name='daily-task' className="grid grid-cols-2 gap-6">
        {[
          { label: 'Project', name: 'project', type: 'text' },
          { label: 'Tasks', name: 'tasks', type: 'text' },
          { label: 'Start Date', name: 'startDate', type: 'date' },
          { label: 'Expt. End Date', name: 'exptEndDate', type: 'date' },
          { label: 'Estd. Hours', name: 'estdHours', type: 'number' },
          { label: 'Status', name: 'status', type: 'text' },
          { label: 'Remarks', name: 'remarks', type: 'text' },
        ].map(({ label, name, type }) => (
          <div key={name} className="col-span-2 sm:col-span-1">
            <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-2">
              {label}
            </label>
            <input
              required
              type={type}
              name={name}
              id={name}
              value={formData[name]}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        ))}
        <div className="col-span-2">
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProjectForm;