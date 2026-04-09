'use client'

import { UseClientContext } from '@/context/ClientContext';
import React, { useState } from 'react';

const Profilepage = () => {

  // Single useState object containing all form fields
  const [formData, setFormData] = useState({
    companyName: '',
    companyType: '',
    purpose: '',
    name: '',
    employees: ''
  });


  const { CreateProfile, loading } = UseClientContext()

  // Handle input changes
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };


  const handelSubmit = async (e: any) => {
    e.preventDefault();
    await CreateProfile(formData.companyName, formData.companyType, formData.purpose, formData.name, formData.employees)
    setFormData({
      companyName: '',
      companyType: '',
      purpose: '',
      name: '',
      employees: ''
    })
    alert("updated succesfully")
  };



  const handleReset = () => {
    setFormData({
      companyName: '',
      companyType: '',
      purpose: '',
      name: '',
      employees: ''
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
        Company Information Form
      </h2>

      <form onSubmit={handelSubmit} className="bg-white rounded-lg shadow-md p-6">
        {/* Company Name Field */}
        <div className="mb-5">
          <label htmlFor="companyName" className="block text-sm font-semibold text-gray-700 mb-2">
            Company Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            placeholder="Enter company name"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Company Type Field */}
        <div className="mb-5">
          <label htmlFor="companyType" className="block text-sm font-semibold text-gray-700 mb-2">
            Company Type <span className="text-red-500">*</span>
          </label>
          <select
            id="companyType"
            name="companyType"
            value={formData.companyType}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
          >
            <option value="">Select company type</option>
            <option value="Private">Private</option>
            <option value="Public">Public</option>
            <option value="Non-Profit">Non-Profit</option>
            <option value="Government">Government</option>
            <option value="Startup">Startup</option>
          </select>
        </div>

        {/* Purpose Field */}
        <div className="mb-5">
          <label htmlFor="purpose" className="block text-sm font-semibold text-gray-700 mb-2">
            Purpose <span className="text-red-500">*</span>
          </label>
          <textarea
            id="purpose"
            name="purpose"
            value={formData.purpose}
            onChange={handleChange}
            placeholder="Enter company purpose or mission"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y"
          />
        </div>

        {/* Name Field */}
        <div className="mb-5">
          <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
            Contact Person Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter contact person name"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Employees Field */}
        <div className="mb-6">
          <label htmlFor="employees" className="block text-sm font-semibold text-gray-700 mb-2">
            Number of Employees <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="employees"
            name="employees"
            value={formData.employees}
            onChange={handleChange}
            placeholder="Enter number of employees"
            min="0"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Form Actions */}
        <div className="flex gap-3">
          <button
            disabled={loading}
            type="submit"
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
          >
            Reset
          </button>
        </div>
      </form>


    </div>
  );
};

export default Profilepage;