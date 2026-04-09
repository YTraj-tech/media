'use client'

import { useWorker } from "@/context/workerContext";
import React, { useState } from "react";
import {
  UserCircle,
  Truck,
  FileText,
  CreditCard,
  Upload,
  Loader2,
  CheckCircle
} from "lucide-react";
import { redirect } from "next/navigation";

const WorkerProfile = () => {


  const [WorkerData, setWorkerData] = useState({
    vehicalType: "",
    gender: "",
    licenseImage: null as File | null,
    rcbookImage: null as File | null
  });

  const [previews, setPreviews] = useState({
    licenseImage: null as string | null,
    rcbookImage: null as string | null
  });

  const { createprofile, loading } = useWorker();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, files } = e.target as HTMLInputElement;

    if (files && files[0]) {
      const file = files[0];
      setWorkerData((prev) => ({
        ...prev,
        [name]: file
      }));

      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setPreviews((prev) => ({
        ...prev,
        [name]: previewUrl
      }));
    } else {
      setWorkerData((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (WorkerData.licenseImage && WorkerData.rcbookImage) {
      await createprofile(
        WorkerData.licenseImage,
        WorkerData.rcbookImage,
        WorkerData.vehicalType,
        WorkerData.gender
      );

    };
    redirect('/worker/location')
  }

    const isFormValid = WorkerData.vehicalType &&
      WorkerData.gender &&
      WorkerData.licenseImage &&
      WorkerData.rcbookImage;

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-full mb-4">
              <UserCircle className="h-12 w-12 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Complete Your Worker Profile
            </h1>
            <p className="text-gray-600">
              Please provide your details to get started as a delivery partner
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
              {/* Vehicle Type */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <span className="flex items-center gap-2">
                    <Truck className="h-4 w-4" />
                    Vehicle Type
                  </span>
                </label>
                <input
                  type="text"
                  name="vehicalType"
                  value={WorkerData.vehicalType}
                  onChange={handleChange}
                  placeholder="e.g., Bike, Scooter, Car"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  required
                />
              </div>

              {/* Gender */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Gender
                </label>
                <select
                  name="gender"
                  value={WorkerData.gender}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-white"
                  required
                >
                  <option value="">Select gender</option>
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                </select>
              </div>

              {/* License Image Upload */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <span className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Driving License
                  </span>
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-blue-400 transition-colors">
                  <div className="space-y-1 text-center">
                    {previews.licenseImage ? (
                      <div className="relative">
                        <img
                          src={previews.licenseImage}
                          alt="License preview"
                          className="mx-auto h-32 w-auto object-contain rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setWorkerData(prev => ({ ...prev, licenseImage: null }));
                            setPreviews(prev => ({ ...prev, licenseImage: null }));
                          }}
                          className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                        >
                          ×
                        </button>
                      </div>
                    ) : (
                      <>
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="flex text-sm text-gray-600">
                          <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none">
                            <span>Upload a file</span>
                            <input
                              type="file"
                              name="licenseImage"
                              accept="image/*"
                              onChange={handleChange}
                              className="sr-only"
                              required={!WorkerData.licenseImage}
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* RC Book Image Upload */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <span className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4" />
                    RC Book
                  </span>
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-blue-400 transition-colors">
                  <div className="space-y-1 text-center">
                    {previews.rcbookImage ? (
                      <div className="relative">
                        <img
                          src={previews.rcbookImage}
                          alt="RC Book preview"
                          className="mx-auto h-32 w-auto object-contain rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setWorkerData(prev => ({ ...prev, rcbookImage: null }));
                            setPreviews(prev => ({ ...prev, rcbookImage: null }));
                          }}
                          className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                        >
                          ×
                        </button>
                      </div>
                    ) : (
                      <>
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="flex text-sm text-gray-600">
                          <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none">
                            <span>Upload a file</span>
                            <input
                              type="file"
                              name="rcbookImage"
                              accept="image/*"
                              onChange={handleChange}
                              className="sr-only"
                              required={!WorkerData.rcbookImage}
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading || !isFormValid}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Creating Profile...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-5 w-5" />
                      Create Worker Profile
                    </>
                  )}
                </button>
              </div>

              {/* Info Note */}
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Note:</strong> Your documents will be verified within 24-48 hours.
                  Please ensure all details are accurate.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };




export default WorkerProfile