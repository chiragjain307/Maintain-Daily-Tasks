import React, { useState, useEffect } from 'react';
import Modal from './Modal';

const ProjectForm = () => {
  const [formData, setFormData] = useState({ Project: '', Tasks: '' });
  const [scriptURL, setScriptURL] = useState('');
  const [fields, setFields] = useState([
    { label: 'Project', name: 'Project', type: 'text' },
    { label: 'Tasks', name: 'Tasks', type: 'text' },
  ]);
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

    const storedFields = JSON.parse(localStorage.getItem('fields'));
    if (storedFields) setFields(storedFields);

    const storedFormData = JSON.parse(localStorage.getItem('formData'));
    if (storedFormData) setFormData(storedFormData);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFormData = { ...formData, [name]: value };
    setFormData(newFormData);
    localStorage.setItem('formData', JSON.stringify(newFormData));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(scriptURL, { method: 'POST', body: new FormData(e.target) })
      .then(() => alert('Thank you! Your form is submitted successfully.'))
      .then(() => window.location.reload())
      .catch(error => console.error('Error!', error.message));
  };

  const handleChangeScriptURL = () => {
    const newScriptURL = prompt('Please enter your new script URL:', scriptURL);
    if (newScriptURL) {
      localStorage.setItem('scriptURL', newScriptURL);
      setScriptURL(newScriptURL);
    }
  };

  const handleAddField = () => {
    setFields([...fields, { label: '', name: '', type: 'text' }]);
  };

  const handleRemoveField = (index) => {
    const newFields = fields.filter((_, i) => i !== index);
    setFields(newFields);
    localStorage.setItem('fields', JSON.stringify(newFields));

    const newFormData = { ...formData };
    delete newFormData[fields[index].name];
    setFormData(newFormData);
    localStorage.setItem('formData', JSON.stringify(newFormData));
  };

  const handleFieldChange = (index, key, value) => {
    const newFields = fields.map((field, i) =>
      i === index ? { ...field, [key]: value, name: key === 'label' ? value : field.name } : field
    );
    setFields(newFields);
    localStorage.setItem('fields', JSON.stringify(newFields));
  };

  const handleToggleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className=''>
      <button
        onClick={() => setIsModalOpen(true)}
        className="absolute top-4 left-4 bg-gray-200 p-2 rounded-md text-sm"
      >
        Google Sheet Code
      </button>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <div className='absolute top-4 right-4 gap-3 flex'>

        <button
          onClick={handleToggleEdit}
          className=" top-4 right-[13%] bg-gray-200 p-2 rounded-md text-sm"
        >
          {isEditing ? 'Stop Editing' : 'Edit Fields'}
        </button>

        <button
          onClick={handleChangeScriptURL}
          className=" top-4 right-4 bg-gray-200 p-2 rounded-md text-sm"
        >
          Change Script URL
        </button>

      </div>

      <div className="max-w-2xl mx-auto bg-transparent p-8 rounded-md shadow-md text-white border-[1px] backdrop-blur-xl">

        <h2 className="text-2xl font-semibold mb-6 text-center">Daily Tasks</h2>

        <form onSubmit={handleSubmit} method="POST" name="daily-task" className="grid grid-cols-2 gap-6">
          {fields.map(({ label, name, type }, index) => (
            <div key={index} className="col-span-2 sm:col-span-1">
              {isEditing ? (
                <div className="flex items-center">
                  <input
                    required
                    type="text"
                    value={label}
                    onChange={(e) => handleFieldChange(index, 'label', e.target.value)}
                    placeholder="Label"
                    className="mr-2 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-transparent"
                  />
                  <select
                    value={type}
                    onChange={(e) => handleFieldChange(index, 'type', e.target.value)}
                    className="mr-2 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-transparent"
                  >
                    <option value="text">Text</option>
                    <option value="date">Date</option>
                    <option value="number">Number</option>
                  </select>
                  <button
                    type="button"
                    onClick={() => handleRemoveField(index)}
                    className="bg-red-500  p-2 rounded-md"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <>
                  <label htmlFor={name} className="block text-sm font-medium mb-2 ">
                    {label}
                  </label>
                  <input
                    required
                    type={type}
                    name={name}
                    id={name}
                    value={formData[name] || ''}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border-2 outline-none border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-transparent"
                  />
                </>
              )}
            </div>
          ))}
          {isEditing && (
            <div className="col-span-2">
              <button
                type="button"
                onClick={handleAddField}
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium  bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Add Field
              </button>
            </div>
          )}
          {!isEditing && (
            <div className="col-span-2">
              <button
                type="submit"
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium  bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Submit
              </button>
            </div>
          )}
        </form>
      </div>

    </div>

  );
};

export default ProjectForm;


