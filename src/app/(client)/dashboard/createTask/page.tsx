'use client'

import { UseClientContext } from '@/context/ClientContext';
import React, { useState } from 'react';

const CreateTask = () => {
  const [formData, setFormData] = useState({
    vehicleType: '',
    startDate: '',
    numberOfWorker: ''
  });

  const { CreateTask } = UseClientContext()
  // Handle input changes

  const handelSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await CreateTask(formData.vehicleType, new Date(formData.startDate), Number(formData.numberOfWorker))
    setFormData(
      {
        vehicleType: '',
        startDate: '',
        numberOfWorker: ''
      }
    )

  }

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const handleReset = () => {
    setFormData({
      vehicleType: '',
      startDate: '',
      numberOfWorker: ''
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
            <h2 className="text-2xl font-bold text-white">
              Create New Task
            </h2>
            <p className="text-blue-100 text-sm mt-1">
              Fill in the details to create a new task
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handelSubmit} className="p-6">
            {/* Vehicle Type Field */}
            <div className="mb-6">
              <label htmlFor="vehicleType" className="block text-sm font-semibold text-gray-700 mb-2">
                Vehicle Type <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="vehicleType"
                name="vehicleType"
                value={formData.vehicleType}
                onChange={handleChange}
                placeholder="e.g., Truck, Van, Car, etc."
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              />
              <p className="mt-1 text-xs text-gray-500">
                Enter the type of vehicle to be used
              </p>
            </div>

            {/* Start Date Field */}
            <div className="mb-6">
              <label htmlFor="startDate" className="block text-sm font-semibold text-gray-700 mb-2">
                Start Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              />
              <p className="mt-1 text-xs text-gray-500">
                Select when the task should begin
              </p>
            </div>

            {/* Number of Workers Field */}
            <div className="mb-6">
              <label htmlFor="numberOfWorker" className="block text-sm font-semibold text-gray-700 mb-2">
                Number of Workers <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="numberOfWorker"
                name="numberOfWorker"
                value={formData.numberOfWorker}
                onChange={handleChange}
                placeholder="Enter number of workers"
                min="1"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              />
              <p className="mt-1 text-xs text-gray-500">
                Specify how many workers will be assigned
              </p>
            </div>

            {/* Form Actions */}
            <div className="flex gap-3 mt-8">
              <button
                type="submit"
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Create Task
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Reset
              </button>
            </div>
          </form>


        </div>
      </div>
    </div>
  );
};

export default CreateTask;