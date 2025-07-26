"use client";
import { useState } from 'react';
import { FiUpload, FiFile, FiX, FiCheck } from 'react-icons/fi';
import axios from 'axios';

export default function Rating() {
    const ratingdata = {
        rating: 75
    }

      return (
        <div className="w-[100%] flex justify-center items-center min-h-[20vh]">
            <p className='text-lg font-[500]'>Based on our analysis your rating is: {ratingdata.rating}%</p>
        </div>
      );
}