"use client";
import { useState } from 'react';
import { FiUpload, FiFile, FiX, FiCheck } from 'react-icons/fi';
import axios from 'axios';

export default function UploadResume() {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    // Validate file type
    const validTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    
    // Validate file size (5MB max)
    if (selectedFile.size > 5 * 1024 * 1024) {
      setError('File size must be less than 5MB');
      return;
    }

    if (!validTypes.includes(selectedFile.type)) {
      setError('Only PDF and Word documents are allowed');
      return;
    }

    setFile(selectedFile);
    setError(null);
    setUploadSuccess(false);
  };

  const uploadToMongoDB = async () => {
    if (!file) return;
    
    setIsUploading(true);
    setError(null);
    
    try {
      const formData = new FormData();
      formData.append('resume', file);
      
      const response = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          // Optional: Add progress bar later
          const percent = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          console.log(`Upload: ${percent}%`);
        }
      });

      if (response.data.success) {
        setUploadSuccess(true);
        setTimeout(() => setUploadSuccess(false), 3000);
      }
    } catch (err) {
      setError(
        err.response?.data?.message || 
        err.message || 
        'Upload failed. Please try again.'
      );
    } finally {
      setIsUploading(false);
    }
  };

  const removeFile = () => {
    setFile(null);
    setUploadSuccess(false);
  };

  return (
    <div className="w-[80%] max-w-md mx-auto">
      <label className="block">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-400 transition-colors">
          <input 
            type="file" 
            onChange={handleFileChange}
            accept=".pdf,.doc,.docx"
            className="hidden"
          />
          <div className="flex flex-col items-center gap-2">
            <FiUpload className="text-2xl text-gray-500" />
            <p className="font-medium">Select resume (PDF or Word)</p>
            <p className="text-sm text-gray-500">Max 5MB</p>
          </div>
        </div>
      </label>

      {file && (
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 mt-4">
          <div className="flex items-center gap-3">
            <FiFile className="text-gray-500" />
            <span className="text-sm font-medium truncate max-w-xs">
              {file.name}
            </span>
            {uploadSuccess && (
              <FiCheck className="text-green-500 ml-2" />
            )}
          </div>
          <button 
            onClick={removeFile}
            className="text-gray-500 hover:text-red-500 transition-colors"
          >
            <FiX />
          </button>
        </div>
      )}

      {error && (
        <p className="text-red-500 text-sm mt-2">{error}</p>
      )}

      {file && !uploadSuccess && (
        <button
          onClick={uploadToMongoDB}
          disabled={isUploading}
          className={`w-full mt-4 py-2 px-4 rounded-lg text-white transition-colors ${
            isUploading 
              ? 'bg-blue-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isUploading ? 'Uploading...' : 'Save to Database'}
        </button>
      )}
    </div>
  );
}