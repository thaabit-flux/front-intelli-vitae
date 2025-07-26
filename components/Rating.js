"use client";
import { useState, useEffect } from 'react';
import { FiUpload, FiFile, FiX, FiCheck, FiLoader } from 'react-icons/fi';
import axios from 'axios';

export default function Rating() {
  const [rating, setRating] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRating = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          'https://softglitch-n8n.onrender.com/webhook/429e2f8b-86e0-42bc-80dc-1cd4634ff74e'
        );

        console.log(response.data);
        
        setRating(response.data.rating || response.data.score || 75); // Fallback to 75 if no rating
      } catch (err) {
        console.error('Error fetching rating:', err);
        setError('Failed to load rating');
        setRating(75); // Fallback value
      } finally {
        setLoading(false);
      }
    };

    fetchRating();
  }, []);

  return (
    <div className="w-[100%] flex justify-center items-center min-h-[20vh]">
      {loading ? (
        <div className="flex items-center gap-2">
          <FiLoader className="animate-spin text-blue-500" />
          <p className="text-lg font-[500]">Analyzing your resume...</p>
        </div>
      ) : error ? (
        <p className="text-lg font-[500] text-red-500">{error}</p>
      ) : (
        <p className="text-lg font-[500]">
          Based on our analysis your rating is: {rating}%
        </p>
      )}
    </div>
  );
}